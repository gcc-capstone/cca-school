"""Pigeon Connect application factory."""

import os
from datetime import datetime
from pathlib import Path

from flask import Flask

from .extensions import csrf, db
from .keys import ensure_pepper, ensure_secret_key
from .routes import register_routes

PROJECT_ROOT = Path(__file__).resolve().parent.parent
FRONTEND_DIR = PROJECT_ROOT / "frontend"
ENV_FILE = PROJECT_ROOT / ".env"
PEPPER_FILE = PROJECT_ROOT / "pepper.bin"


def create_app() -> Flask:
    app = Flask(
        __name__,
        template_folder=str(FRONTEND_DIR / "templates"),
        static_folder=str(FRONTEND_DIR / "static"),
        instance_path=str(PROJECT_ROOT / "instance"),
    )
    Path(app.instance_path).mkdir(parents=True, exist_ok=True)

    # Secrets: generated on first run if missing.
    app.config["SECRET_KEY"] = ensure_secret_key(ENV_FILE)
    app.config["PEPPER"] = ensure_pepper(PEPPER_FILE)

    # Database: DATABASE_URL if set, otherwise a local SQLite file in instance/.
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URL", f"sqlite:///{Path(app.instance_path) / 'data.db'}"
    )

    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"

    db.init_app(app)
    csrf.init_app(app)

    @app.context_processor
    def inject_globals():
        return {"current_year": datetime.now().year}

    register_routes(app)

    return app
