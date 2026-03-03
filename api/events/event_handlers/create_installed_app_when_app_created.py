from events.app_event import app_was_created
from extensions.ext_database import db
from models.model import InstalledApp


@app_was_created.connect
def handle(sender, **kwargs):
    """Create an installed app when an app is created."""
    app = sender
    account = kwargs.get('account') # add_angelen
    installed_app = InstalledApp(
        tenant_id=app.tenant_id,
        app_id=app.id,
        app_owner_tenant_id=app.tenant_id,
        #here installed app's creator should be changed to current user
        created_by = account.id, # add_angelen
    )
    db.session.add(installed_app)
    db.session.commit()
