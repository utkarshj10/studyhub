from fastapi import APIRouter, HTTPException, status

from ..auth import create_access_token, hash_password, verify_password
from ..database import users_collection
from ..models import now_utc, serialize_user
from ..schemas import AuthResponse, LoginRequest, RegisterRequest, UserResponse

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest):
    email = payload.email.lower().strip()

    if users_collection.find_one({"email": email}):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    user = {
        "name": payload.name.strip(),
        "email": email,
        "password_hash": hash_password(payload.password),
        "created_at": now_utc(),
    }

    result = users_collection.insert_one(user)
    user["_id"] = result.inserted_id

    return {
        "access_token": create_access_token(str(user["_id"])),
        "token_type": "bearer",
        "user": serialize_user(user),
    }


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest):
    email = payload.email.lower().strip()
    user = users_collection.find_one({"email": email})

    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
        )

    return {
        "access_token": create_access_token(str(user["_id"])),
        "token_type": "bearer",
        "user": serialize_user(user),
    }
