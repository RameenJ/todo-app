from fastapi import FastAPI
from app.api import auth
from app.api import todo

app = FastAPI(debug=True)

# Register routes
app.include_router(auth.router)

app.include_router(todo.router)
