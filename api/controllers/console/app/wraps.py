from collections.abc import Callable
from functools import wraps
from typing import ParamSpec, TypeVar, Union

from controllers.console.app.error import AppNotFoundError
from extensions.ext_database import db
from libs.login import current_account_with_tenant
from models import App, AppMode

P = ParamSpec("P")
R = TypeVar("R")
P1 = ParamSpec("P1")
R1 = TypeVar("R1")


def _load_app_model(app_id: str) -> App | None:
    _, current_tenant_id = current_account_with_tenant()
    app_model = (
        db.session.query(App)
        .where(App.id == app_id, App.tenant_id == current_tenant_id, App.status == "normal")
        .first()
    )
    return app_model


def _load_app_model_with_trial(app_id: str) -> App | None:
    app_model = db.session.query(App).where(App.id == app_id, App.status == "normal").first()
    return app_model


def get_app_model(view: Callable[P, R] | None = None, *, mode: Union[AppMode, list[AppMode], None] = None):
    def decorator(view_func: Callable[P1, R1]):
        @wraps(view_func)
        def decorated_view(*args: P1.args, **kwargs: P1.kwargs):
            if not kwargs.get("app_id"):
                raise ValueError("missing app_id in path parameters")

            app_id = kwargs.get("app_id")
            app_id = str(app_id)

            del kwargs["app_id"]

            app_model = _load_app_model(app_id)

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


def get_app_model_with_trial(view: Callable[P, R] | None = None, *, mode: Union[AppMode, list[AppMode], None] = None):
    def decorator(view_func: Callable[P, R]):
        @wraps(view_func)
        def decorated_view(*args: P.args, **kwargs: P.kwargs):
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


def edit_app_permission_required(f: Callable[P, R]):
    """Decorator to require that the current user is either an admin/owner or the creator of the app.

    This is intended for app modification endpoints. It expects the wrapped view to receive
    `app_model` as a keyword argument (ensured by `get_app_model` decorator applied above).
    """
    @wraps(f)
    def decorated(*args: P.args, **kwargs: P.kwargs):
        from werkzeug.exceptions import Forbidden

        from libs.login import current_user
        from models import Account

        user = current_user._get_current_object()  # type: ignore
        if not isinstance(user, Account):
            raise Forbidden()

        if not current_user.has_edit_permission:
            raise Forbidden()

        app_model = kwargs.get("app_model")
        if app_model is None:
            # no app provided, deny
            raise Forbidden()

        # allow if admin/owner
        if getattr(user, "is_admin_or_owner", False):
            return f(*args, **kwargs)

        # allow if user is creator
        if getattr(user, "id", None) and str(user.id) == str(getattr(app_model, "created_by", None)):
            return f(*args, **kwargs)

        raise Forbidden()

    return decorated