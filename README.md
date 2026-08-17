# StudyHub

StudyHub is a full-stack study planning web application designed to help students organize tasks, track progress, and keep their study workflow in one place.

The project was built as a practical full-stack application using a modern frontend, REST API backend, and cloud-hosted NoSQL database.

## Features

* User registration and login
* JWT-based authentication
* Protected dashboard
* Create study tasks
* Assign subjects and priorities
* Set due dates
* Mark tasks as completed
* Delete tasks
* Search and filter tasks
* Dashboard statistics and completion progress
* Persistent data storage with MongoDB Atlas
* Responsive interface

## Project Setup

### Prerequisites

Make sure you have installed:

* Python 3.10+
* Node.js and npm
* Git
* A MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/studyhub.git
cd studyhub
```

### 2. Backend setup

Navigate to the backend:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv .venv
```

Activate it using Git Bash on Windows:

```bash
source .venv/Scripts/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure backend environment

Create a file:

```text
backend/.env
```

Use `backend/.env.example` as a template:

```env
MONGODB_URL=your_mongodb_atlas_connection_string
DATABASE_NAME=studyhub
JWT_SECRET=your_random_jwt_secret
FRONTEND_URL=http://localhost:3000
```

Replace values with your own credentials.

**Do not commit ****`.env`**** to GitHub.**

### 4. Start the backend

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

### 5. Frontend setup

Open a second terminal and go to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

### 6. Run the application

Keep both servers running:

**Backend**

```bash
cd backend
source .venv/Scripts/activate
uvicorn app.main:app --reload
```

**Frontend**

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:3000
```
