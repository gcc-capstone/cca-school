"""Creates the app's secret material on first run.

SECRET_KEY
    Stored in .env. If .env is missing, or has no SECRET_KEY (or an empty
    one), a new key is generated and written to it. A SECRET_KEY set in the
    real environment (e.g. by Docker or a deployment platform) takes
    precedence over the .env value.

pepper.bin
    32 random bytes, mixed into password hashes once login exists. Created
    if missing and never overwritten: a new pepper would invalidate every
    stored password hash, so back this file up with the database.
"""

import os
import secrets
from contextlib import contextmanager
from pathlib import Path

from dotenv import dotenv_values, load_dotenv, set_key

try:
    import fcntl
except ImportError:  # Windows
    fcntl = None

SECRET_KEY_NAME = "SECRET_KEY"
PEPPER_BYTES = 32


@contextmanager
def _locked(path: Path):
    """Hold an exclusive lock on path so several worker processes
    starting at once don't each generate a different secret."""
    with open(path, "a+") as fh:
        if fcntl:
            fcntl.flock(fh, fcntl.LOCK_EX)
        try:
            yield
        finally:
            if fcntl:
                fcntl.flock(fh, fcntl.LOCK_UN)


def _owner_only(path: Path) -> None:
    try:
        os.chmod(path, 0o600)
    except OSError:
        pass


def ensure_secret_key(env_file: Path) -> str:
    with _locked(env_file):
        if not (dotenv_values(env_file).get(SECRET_KEY_NAME) or "").strip():
            set_key(env_file, SECRET_KEY_NAME, secrets.token_hex(32), quote_mode="never")
            _owner_only(env_file)

    load_dotenv(env_file)  # does not override variables already set
    return os.environ[SECRET_KEY_NAME]


def ensure_pepper(pepper_file: Path) -> bytes:
    try:
        with open(pepper_file, "xb") as fh:  # x = fail if it already exists
            fh.write(secrets.token_bytes(PEPPER_BYTES))
        _owner_only(pepper_file)
    except FileExistsError:
        pass

    pepper = pepper_file.read_bytes()
    if len(pepper) != PEPPER_BYTES:
        raise RuntimeError(
            f"{pepper_file} should contain exactly {PEPPER_BYTES} bytes; "
            "refusing to start with a damaged pepper."
        )
    return pepper
