import secrets, string, bcrypt



def generate_api_key(length=16):
    """Generate a random API key."""
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))



def verifyPassword(plain_password, hashed_password):
    try:
        plain_password_encoded = plain_password.encode('utf-8')
        hashed_password_encoded = hashed_password.encode('utf-8')

        return bcrypt.checkpw(plain_password_encoded, hashed_password_encoded)
    except Exception as e:
        print(f"Error in verifyPassword: {e}")
        return False

