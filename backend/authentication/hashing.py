from cryptography.fernet import Fernet
from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher

class PasswordHasher():

    def __init__(self, pepper_key: bytes):
        self.pepper = Fernet(pepper_key)
        self.pwd_hash = PasswordHash((Argon2Hasher(),))

    def hash(self, pwd: str, salt: str) -> bytes:

        # Hash the password with the salt
        hashed: str = self.pwd_hash.hash(salt+pwd+salt)

        # Convert string to hash bytes then encrypt with pepper
        hashedBytes: bytes = hashed.encode('utf-8')
        hashedPepper: bytes = self.pepper.encrypt(hashedBytes)
        return hashedPepper
