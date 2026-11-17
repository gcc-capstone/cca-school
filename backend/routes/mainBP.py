from flask import Blueprint, jsonify, render_template

bp = Blueprint("main", __name__)


@bp.get("/")
def index():
    return render_template("index.html")


@bp.get("/health")
def health():
    """Liveness check for Docker / uptime monitors, also used by the home page."""
    return jsonify(status="ok")
