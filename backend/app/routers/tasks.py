from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId

from ..database import tasks_collection
from ..dependencies import get_current_user
from ..models import now_utc, serialize_task, to_object_id
from ..schemas import DashboardStats, TaskCreate, TaskResponse, TaskUpdate

router = APIRouter(prefix="/api/tasks", tags=["Tasks"])


@router.get("", response_model=list[TaskResponse])
def get_tasks(current_user=Depends(get_current_user)):
    tasks = tasks_collection.find(
        {"user_id": current_user["_id"]}
    ).sort("created_at", -1)

    return [serialize_task(task) for task in tasks]


@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate, current_user=Depends(get_current_user)):
    task = {
        "user_id": current_user["_id"],
        "title": payload.title.strip(),
        "subject": payload.subject.strip(),
        "description": payload.description.strip(),
        "priority": payload.priority,
        "due_date": payload.due_date,
        "completed": False,
        "created_at": now_utc(),
        "completed_at": None,
    }

    result = tasks_collection.insert_one(task)
    task["_id"] = result.inserted_id

    return serialize_task(task)


@router.patch("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: str,
    payload: TaskUpdate,
    current_user=Depends(get_current_user),
):
    object_id = to_object_id(task_id)

    if not object_id:
        raise HTTPException(status_code=400, detail="Invalid task ID.")

    existing = tasks_collection.find_one(
        {"_id": object_id, "user_id": current_user["_id"]}
    )

    if not existing:
        raise HTTPException(status_code=404, detail="Task not found.")

    updates = payload.model_dump(exclude_unset=True)

    if "title" in updates and updates["title"] is not None:
        updates["title"] = updates["title"].strip()

    if "subject" in updates and updates["subject"] is not None:
        updates["subject"] = updates["subject"].strip()

    if "description" in updates and updates["description"] is not None:
        updates["description"] = updates["description"].strip()

    if updates.get("completed") is True and not existing.get("completed"):
        updates["completed_at"] = now_utc()

    if updates.get("completed") is False:
        updates["completed_at"] = None

    if updates:
        tasks_collection.update_one(
            {"_id": object_id},
            {"$set": updates},
        )

    updated = tasks_collection.find_one({"_id": object_id})
    return serialize_task(updated)


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: str, current_user=Depends(get_current_user)):
    object_id = to_object_id(task_id)

    if not object_id:
        raise HTTPException(status_code=400, detail="Invalid task ID.")

    result = tasks_collection.delete_one(
        {"_id": object_id, "user_id": current_user["_id"]}
    )

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found.")


@router.get("/stats/summary", response_model=DashboardStats)
def get_stats(current_user=Depends(get_current_user)):
    user_id = current_user["_id"]
    total = tasks_collection.count_documents({"user_id": user_id})
    completed = tasks_collection.count_documents(
        {"user_id": user_id, "completed": True}
    )
    pending = total - completed
    high_priority = tasks_collection.count_documents(
        {"user_id": user_id, "priority": "high", "completed": False}
    )

    rate = round((completed / total) * 100) if total else 0

    return {
        "total": total,
        "completed": completed,
        "pending": pending,
        "high_priority": high_priority,
        "completion_rate": rate,
    }
