# StudyHub

A polished full-stack study planner built with:

- Next.js (App Router) + TypeScript
- FastAPI + Python
- MongoDB Atlas
- JWT authentication
- Tailwind CSS
- REST API

## Project structure

```text
studyhub/
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── register/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   ├── types/
│   ├── .env.local.example
│   ├── package.json
│   ├── postcss.config.mjs
│   └── tsconfig.json
└── backend/
    ├── app/
    │   ├── routers/
    │   ├── auth.py
    │   ├── database.py
    │   ├── dependencies.py
    │   ├── main.py
    │   ├── models.py
    │   └── schemas.py
    ├── .env.example
    └── requirements.txt
```

## Setup

The accompanying ChatGPT conversation should guide you through:

1. Installing prerequisites
2. Creating the Python virtual environment
3. Creating MongoDB Atlas
4. Creating `.env` files
5. Starting FastAPI
6. Starting Next.js
7. Connecting frontend and backend
8. Testing authentication and CRUD
9. Initializing Git
10. Pushing to GitHub

Do not commit `.env`, `.env.local`, `node_modules`, `.venv`, or build output.
