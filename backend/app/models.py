from datetime import datetime, timezone
from bson import ObjectId


def serialize_task(task: dict) -> dict:
    return {
        "id": str(task["_id"]),
        "title": task["title"],
        "subject": task["subject"],
        "description": task.get("description", ""),
        "priority": task["priority"],
        "due_date": task.get("due_date"),
        "completed": task["completed"],
        "created_at": task["created_at"].isoformat(),
        "completed_at": (
            task["completed_at"].isoformat()
            if task.get("completed_at")
            else None
        ),
    }


def serialize_user(user: dict) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "created_at": user["created_at"].isoformat(),
    }


def now_utc() -> datetime:
    return datetime.now(timezone.utc)


def to_object_id(value: str) -> ObjectId | None:
    if not ObjectId.is_valid(value):
        return None
    return ObjectId(value)
