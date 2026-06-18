"""Controller decorators for console app resources.

`with_session` opens one SQLAlchemy session for a request handler and injects it
as the first argument after `self`. Handlers use a transaction by default so
migrated write paths keep commit/rollback handling; pure read handlers may opt
out with `write=False`. App-loading decorators prefer that injected session when
present, while still supporting existing handlers that have not been migrated
yet and still rely on Flask-SQLAlchemy's scoped `db.session`.
"""

from collections.abc import Callable
from functools import wraps
from typing import Concatenate, cast, overload

from sqlalchemy import select
from sqlalchemy.orm import Session

from controllers.console.app.error import AppNotFoundError
from core.db.session_factory import session_factory
from extensions.ext_database import db
from libs.login import current_account_with_tenant
from models import App, AppMode


def _load_app_model(session: Session, app_id: str) -> App | None:
    """Load the tenant-scoped app row with the request session owned by `with_session`."""
    _, current_tenant_id = current_account_with_tenant()
    app_model = session.scalar(
        select(App).where(App.id == app_id, App.tenant_id == current_tenant_id, App.status == "normal").limit(1)
    )
    return app_model


def _load_app_model_from_scoped_session(app_id: str) -> App | None:
    """Load the app row for legacy handlers that have not adopted request session injection yet."""
    _, current_tenant_id = current_account_with_tenant()
    app_model = db.session.scalar(
        select(App).where(App.id == app_id, App.tenant_id == current_tenant_id, App.status == "normal").limit(1)
    )
    return app_model


def _load_app_model_with_trial(app_id: str) -> App | None:
    app_model = db.session.scalar(select(App).where(App.id == app_id, App.status == "normal").limit(1))
    return app_model


@overload
def with_session[T, **P, R](
    view: Callable[Concatenate[T, Session, P], R],
    *,
    write: bool = True,
) -> Callable[Concatenate[T, P], R]: ...


@overload
def with_session[T, **P, R](
    view: None = None,
    *,
    write: bool = True,
) -> Callable[[Callable[Concatenate[T, Session, P], R]], Callable[Concatenate[T, P], R]]: ...


def with_session[T, **P, R](
    view: Callable[Concatenate[T, Session, P], R] | None = None,
    *,
    write: bool = True,
) -> (
    Callable[Concatenate[T, P], R] | Callable[[Callable[Concatenate[T, Session, P], R]], Callable[Concatenate[T, P], R]]
):
    """Inject a request-scoped session, using a transaction only for write handlers."""

    def decorator(view: Callable[Concatenate[T, Session, P], R]) -> Callable[Concatenate[T, P], R]:
        @wraps(view)
        def wrapper(self: T, *args: P.args, **kwargs: P.kwargs) -> R:
            if write:
                with session_factory.get_session_maker().begin() as session:
                    return view(self, session, *args, **kwargs)

            with session_factory.create_session() as session:
                return view(self, session, *args, **kwargs)

        return wrapper

    if view is None:
        return decorator
    return decorator(view)


def _get_injected_session(args: tuple[object, ...]) -> Session | None:
    """Return the request session inserted by `with_session`, if this handler has been migrated."""
    if len(args) < 2:
        return None

    candidate = args[1]
    if isinstance(candidate, Session):
        return candidate

    if hasattr(candidate, "scalar") and hasattr(candidate, "commit") and hasattr(candidate, "rollback"):
        return cast(Session, candidate)

    return None


@overload
def get_app_model[**P, R](
    view: Callable[P, R],
    *,
    mode: AppMode | list[AppMode] | None = None,
) -> Callable[P, R]: ...


@overload
def get_app_model[**P, R](
    view: None = None,
    *,
    mode: AppMode | list[AppMode] | None = None,
) -> Callable[[Callable[P, R]], Callable[P, R]]: ...


def get_app_model[**P, R](
    view: Callable[P, R] | None = None,
    *,
    mode: AppMode | list[AppMode] | None = None,
) -> Callable[P, R] | Callable[[Callable[P, R]], Callable[P, R]]:
    """Inject the App model for handlers that receive an `app_id` path parameter.

    New handlers may compose `@with_session` above this decorator so the app row
    is loaded through the same request-scoped session used by the controller.
    Existing handlers continue to work through `db.session` until migrated.
    """

    def decorator(view_func: Callable[P, R]) -> Callable[P, R]:
        @wraps(view_func)
        def decorated_view(*args: P.args, **kwargs: P.kwargs) -> R:
            if not kwargs.get("app_id"):
                raise ValueError("missing app_id in path parameters")

            app_id = kwargs.get("app_id")
            app_id = str(app_id)

            del kwargs["app_id"]

            session = _get_injected_session(args)
            if session is None:
                app_model = _load_app_model_from_scoped_session(app_id)
            else:
                app_model = _load_app_model(session, app_id)

            if not app_model:
                raise AppNotFoundError()

            app_mode = AppMode.value_of(app_model.mode)

            if mode is not None:
                if isinstance(mode, list):
                    modes = mode
                else:
                    modes = [mode]

                if app_mode not in modes:
                    mode_values = {m.value for m in modes}
                    raise AppNotFoundError(f"App mode is not in the supported list: {mode_values}")

            kwargs["app_model"] = app_model

            return view_func(*args, **kwargs)

        return decorated_view

    if view is None:
        return decorator
    else:
        return decorator(view)


@overload
def get_app_model_with_trial[**P, R](
    view: Callable[P, R],
    *,
    mode: AppMode | list[AppMode] | None = None,
) -> Callable[P, R]: ...


@overload
def get_app_model_with_trial[**P, R](
    view: None = None,
    *,
    mode: AppMode | list[AppMode] | None = None,
) -> Callable[[Callable[P, R]], Callable[P, R]]: ...


def get_app_model_with_trial[**P, R](
    view: Callable[P, R] | None = None,
    *,
    mode: AppMode | list[AppMode] | None = None,
) -> Callable[P, R] | Callable[[Callable[P, R]], Callable[P, R]]:
    def decorator(view_func: Callable[P, R]) -> Callable[P, R]:
        @wraps(view_func)
        def decorated_view(*args: P.args, **kwargs: P.kwargs) -> R:
            if not kwargs.get("app_id"):
                raise ValueError("missing app_id in path parameters")

            app_id = kwargs.get("app_id")
            app_id = str(app_id)

            del kwargs["app_id"]

            app_model = _load_app_model_with_trial(app_id)

            if not app_model:
                raise AppNotFoundError()

            app_mode = AppMode.value_of(app_model.mode)

            if mode is not None:
                if isinstance(mode, list):
                    modes = mode
                else:
                    modes = [mode]

                if app_mode not in modes:
                    mode_values = {m.value for m in modes}
                    raise AppNotFoundError(f"App mode is not in the supported list: {mode_values}")

            kwargs["app_model"] = app_model

            return view_func(*args, **kwargs)

        return decorated_view

    if view is None:
        return decorator
    else:
        return decorator(view)


def edit_app_permission_required[**P, R](f: Callable[P, R]) -> Callable[P, R]:
    """Decorator to require that the current user is either an admin/owner or the creator of the app.

    This is intended for app modification endpoints. It expects the wrapped view to receive
    `app_model` as a keyword argument (ensured by `get_app_model` decorator applied above).
    """
    @wraps(f)
    def decorated(*args: P.args, **kwargs: P.kwargs) -> R:
        from werkzeug.exceptions import Forbidden

        from libs.login import current_user
        from models import Account

        user = current_user._get_current_object()  # type: ignore
        if not isinstance(user, Account):
            raise Forbidden()

        if not current_user.has_edit_permission:
            raise Forbidden()

        app_model = kwargs.get("app_model", None)
        if app_model is None:
            # no app provided, deny
            # raise Forbidden()
            return f(*args, **kwargs)

        # allow if admin/owner
        if getattr(user, "is_admin_or_owner", False):
            return f(*args, **kwargs)

        # allow if user is creator
        if getattr(user, "id", None) and str(user.id) == str(getattr(app_model, "created_by", None)):
            return f(*args, **kwargs)

        raise Forbidden()

    return decorated
