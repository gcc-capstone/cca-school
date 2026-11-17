"""Flask extensions, created here so models and forms can import them
without importing the app itself (avoids circular imports)."""

from flask_sqlalchemy import SQLAlchemy
from flask_wtf import CSRFProtect

db = SQLAlchemy()
csrf = CSRFProtect()
