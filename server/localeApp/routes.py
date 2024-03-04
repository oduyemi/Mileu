import os, time, bcrypt, hashlib, logging, requests
from datetime import datetime
from fastapi import APIRouter, Request, status, Depends, HTTPException, Path
from fastapi.responses import JSONResponse
from sqlalchemy import or_
from sqlalchemy.orm import Session
from localeApp import app, models, schemas
from typing import Optional, List
from localeApp.models import Users, Region, State, LGA
from localeApp.schemas import UserResponse, UserRegistrationRequest, UserLoginRequest, Token
from localeApp.database import SessionLocal
from .authorize import create_access_token, verify_token, authenticate_user
from passlib.context import CryptContext
from localeApp.dependencies import get_db, get_user_from_session, get_current_user, create_jwt_token, get_token
from .dependencies import get_db
from instance.config import SECRET_KEY, DATABASE_URI
from dotenv import load_dotenv
from .utils import generate_api_key


load_dotenv()


localeRouter = APIRouter()

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

logger = logging.getLogger(__name__)


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)




#    E  N  D  P  O  I  N  T  S

@app.get("/")
async def get_index():
    return {"message": "Locale API!"}

@app.get("/users", response_model=List[schemas.UserResponse])
async def get_users(db: Session = Depends(get_db)):
    users = db.query(Users).all()

    if not users:
        raise HTTPException(status_code=404, detail="Users not available!")

    user_responses = [
        UserResponse(
            id = user.id,
            firstName = user.firstName,
            lastName = user.lastName,
            email = user.email,
            hashedPassword = user.hashedPassword,
        )
        for user in users
    ]

    return user_responses


@app.get("/users/{id}", response_model=schemas.UserResponse)
async def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not available!")

    user_response = schemas.UserResponse(
        id = user.id,
        firstName = user.firstName,
        lastName = user.lastName,
        email = user.email,
        hashedPassword = user.hashedPassword
    )

    return user_response

@app.put("/users/{id}", response_model=schemas.UserResponse)
async def edit_user_details(id: int, user_data: schemas.UserUpdate, db: Session = Depends(get_db)):
    try:
        user = db.query(Users).filter(Users.id == id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not available!")

        if user_data.first_name:
            user.firstName = user_data.first_name
        if user_data.last_name:
            user.lastName = user_data.last_name
        if user_data.email:
            user.email = user_data.email

        db.commit()

        return user
    except Exception as e:
        print(f"Error: {e}")


@app.post("/api-key/{apiKey}")
async def api_key(apiKey: str = Path(...), db: Session = Depends(get_db)):
    try:
        print(f"Received API key: {apiKey}")
        user = db.query(Users).filter(Users.api_key == apiKey).first()
  
        if not user:
            raise HTTPException(status_code=404, detail="Incorrect API key. Sign up to generate API key")

        return {"api_key": user.api_key}

    except Exception as e:
        print(f"Error: {e}")
        raise


@app.get("/api-key/{apiKey}")
async def get_api_key(apiKey: str = Path(...), db: Session = Depends(get_db)):
    try:
        print(f"Received API key: {apiKey}")
        user = db.query(Users).filter(Users.api_key == apiKey).first()
  
        if not user:
            raise HTTPException(status_code=404, detail="Incorrect API key. Sign up to generate API key")

        return {"api_key": user.api_key}

    except Exception as e:
        print(f"Error: {e}")
        raise



@app.get("/regions")
async def get_regions(db: Session = Depends(get_db)):
    regions = db.query(Region).all()
    return regions


@app.get("/regions/{region_id}")
async def get_region(region_id: int, db: Session = Depends(get_db)):
    region = db.query(Region).filter(Region.region_id == region_id).first()
    if not region:
        raise HTTPException(status_code=404, detail="Region not found")
    return region

@app.get("/states")
async def get_states(db: Session = Depends(get_db)):
    states = db.query(State).all()
    return states


@app.get("/states/{state_id}")
async def get_state(state_id: int, db: Session = Depends(get_db), user: Users = Depends(get_current_user)):
    state = db.query(State).filter(State.state_id == state_id).first()
    if not state:
        raise HTTPException(status_code=404, detail="State not found")
    return state

@app.get("/lgas")
async def get_lgas(db: Session = Depends(get_db)):
    lgas = db.query(LGA).all()
    return lgas


@app.get("/lgas/{lga_id}")
async def get_lga(lga_id: int, db: Session = Depends(get_db), user: Users = Depends(get_current_user)):
    lga = db.query(LGA).filter(LGA.lga_id == lga_id).first()
    if not lga:
        raise HTTPException(status_code=404, detail="LGA not found")
    return lga


@app.post("/sign-up")
async def register_user(user_request: UserRegistrationRequest, db: Session = Depends(get_db)):
    try:
        if user_request.password != user_request.confirmPassword:
            raise HTTPException(status_code=400, detail="Passwords do not match")

        if not all([user_request.firstName, user_request.lastName, user_request.email, user_request.password, user_request.confirmPassword]):
            raise HTTPException(status_code=400, detail="All fields are required")

        existing_user = db.query(Users).filter(Users.email == user_request.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email is already taken")

        hashedPassword = hash_password(user_request.password)

        new_user = Users(
            firstName=user_request.firstName,
            lastName=user_request.lastName,
            email=user_request.email,
            hashedPassword=hashedPassword,
            api_key=generate_api_key()
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        token = create_access_token({"sub": new_user.email})

        return {
            "firstName": new_user.firstName,
            "lastName": new_user.lastName,
            "email": new_user.email,
            "token": token,
            "api_key": new_user.api_key
        }

    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
        raise


@app.post("/sign-in")
async def signin_user(user_request: UserLoginRequest, db: Session = Depends(get_db)):
    try:
        if not all([user_request.email, user_request.password]):
            raise HTTPException(status_code=400, detail="Email and password are required")

        user = db.query(Users).filter(Users.email == user_request.email).first()
        if not user or not verify_password(user_request.password, user.hashedPassword):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        access_token = create_access_token(data={"sub": user.email})
        print(f"Access Token: {access_token}")

        return JSONResponse(content={
            "access_token": access_token, "token_type": "bearer",
            "user": {
                "id": user.id,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "email": user.email,
                "api_key": user.api_key
            }
        })
            
    except Exception as e:
        print(f"Error: {e}")
        raise



@app.post("/signout")
async def logout_user(token: str = Depends(get_token)):
    user_id = get_user_from_session(token)
    if user_id:
        remove_user_from_session(user_id)
        return {"message": "Logout successful"}
    else:
        raise HTTPException(status_code=401, detail="User not in session")

