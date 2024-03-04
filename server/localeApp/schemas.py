from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List


class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    id: int
    firstName: str
    lastName: str
    email: str
    hashedPassword: str

class UserRegistrationRequest(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str
    confirmPassword: str


class UserLoginRequest(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None

class ApiKeyRequest(BaseModel):
    api_key: str
