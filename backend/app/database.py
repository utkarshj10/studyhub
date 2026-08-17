import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME", "studyhub")

if not MONGODB_URL:
    raise RuntimeError("MONGODB_URL is not set. Create backend/.env first.")

client = MongoClient(MONGODB_URL)
db = client[DATABASE_NAME]

users_collection = db["users"]
tasks_collection = db["tasks"]

users_collection.create_index("email", unique=True)
tasks_collection.create_index([("user_id", 1), ("created_at", -1)])
