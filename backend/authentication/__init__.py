from flask import Flask, render_template, url_for, redirect
from flask import request, flash
from flask_login import (
    LoginManager, login_required, login_user, logout_user
)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

from hashing import PasswordHasher

def get_hasher(pepper_key: bytes):
    pwd_hasher = PasswordHasher(pepper_key)

def login_manager(app: Flask):
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.session_protection = "strong"

    @login_manager.user_loader
    def load_user(uid: str) -> User|None:
        return get_user(uid=int(uid))