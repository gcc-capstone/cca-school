"""Registers every route blueprint with the app.

To add a page group: create backend/routes/somethingBP.py that defines
`bp = Blueprint(...)`, then import and add it to BLUEPRINTS below.
"""

from flask import Flask

from .mainBP import bp as main_bp

BLUEPRINTS = (
    main_bp,
)


def register_routes(app: Flask) -> None:
    for blueprint in BLUEPRINTS:
        app.register_blueprint(blueprint)
