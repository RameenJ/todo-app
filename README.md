---markdown
# Todo App Backend

A clean, modular, and containerized **backend-only** Todo application built with **FastAPI**, **PostgreSQL**, **SQLAlchemy**, and **Alembic**. This project follows clean architecture principles with separate layers for API, services, repositories, and database.

---

## Tech Stack

- **FastAPI** — high-performance web framework
- **PostgreSQL** — relational database
- **SQLAlchemy** — ORM for Python
- **Alembic** — database migrations
- **Docker** — containerization
- **Docker Compose** — service orchestration
- **Pydantic** — data validation and serialization

---

## Project Structure

```

todo-app/
├── alembic/           # Database migration scripts
├── app/
│   ├── api/           # API routers
│   ├── core/          # Security, config, and utility logic
│   ├── db/            # Session and DB-related setup
│   ├── models/        # SQLAlchemy ORM models
│   ├── repositories/  # DB query logic
│   ├── schemas/       # Pydantic request/response schemas
│   ├── services/      # Business logic
│   └── main.py        # FastAPI application entry point
├── docker-compose.yml # Multi-container setup
├── Dockerfile         # Backend image definition
├── .env               # Environment variables (DB credentials, secrets)
├── requirements.txt   # Python dependencies
└── README.md          # Project documentation

````

---

## Getting Started

### Prerequisites

- Docker + Docker Compose
- Git

---

### Installation & Run (Local via Docker)

1. **Clone the repository**

```bash
git clone https://github.com/RameenJ/todo-app.git
cd todo-app
````

2. **Configure environment**

Edit the `.env` file as needed:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=YourNewSecurePassword
POSTGRES_DB=todo_db
DATABASE_URL=postgresql://postgres:YourNewSecurePassword@db:5432/todo_db
SECRET_KEY=your-secret-key
```

3. **Start the app**

```bash
docker-compose up --build
```

> This runs both the FastAPI app and PostgreSQL database.

4. **Run Alembic migrations**

In a new terminal (while containers are up):

```bash
docker exec -it todo-app-backend-1 alembic upgrade head
```

---

### 🧪 Testing the API

Use **Postman** to test the endpoints at:

```
http://localhost:8000
```

API docs are available at:

* Swagger: `http://localhost:8000/docs`
---

## Core Features

* User authentication (JWT-based)
* Create, update, delete, and list todos
* Modular and clean architecture
* SQLAlchemy ORM models and repository pattern
* Alembic-powered migrations
* Fully containerized with Docker

---

## Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | `/auth/signup` | Register new user |
| POST   | `/auth/login`  | Login + JWT token |
| GET    | `/todos/`      | Get all todos     |
| POST   | `/todos/`      | Create a todo     |
| PUT    | `/todos/{id}`  | Update a todo     |
| DELETE | `/todos/{id}`  | Delete a todo     |

---

## 🗃️ Alembic Migrations

```bash
# Create a new migration script
alembic revision --autogenerate -m "your message"

# Apply migrations
alembic upgrade head
```

---

## Future Improvements

* Add unit and integration tests with `pytest`
* Rate limiting or user quotas
* Logging, error tracking, and monitoring setup
* frontend


---

## Author

Built by [Rameen Jamshed](https://github.com/RameenJ)


