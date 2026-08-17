from datetime import datetime
from typing import Literal
from pydantic import BaseModel, EmailStr, Field, ConfigDict


Priority = Literal["low", "medium", "high"]


class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=60)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    created_at: datetime


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=120)
    subject: str = Field(min_length=1, max_length=60)
    description: str = Field(default="", max_length=500)
    priority: Priority = "medium"
    due_date: str | None = None


class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=120)
    subject: str | None = Field(default=None, min_length=1, max_length=60)
    description: str | None = Field(default=None, max_length=500)
    priority: Priority | None = None
    due_date: str | None = None
    completed: bool | None = None


class TaskResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    subject: str
    description: str
    priority: Priority
    due_date: str | None
    completed: bool
    created_at: datetime
    completed_at: datetime | None


class DashboardStats(BaseModel):
    total: int
    completed: int
    pending: int
    high_priority: int
    completion_rate: int
