from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.todo import ToDoCreate, ToDoOut
from app.models.todo import ToDo
from app.core.dependencies import get_current_user, get_db
from app.models.user import User
from typing import List
from app.schemas.todo import ToDoCreate, ToDoUpdate, ToDoOut
from fastapi import Path, Query
from typing import Optional

router = APIRouter(prefix="/todos", tags=["todos"])

@router.post("/", response_model=ToDoOut)
def create_todo(todo_data: ToDoCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_todo = ToDo(
        title=todo_data.title,
        description=todo_data.description,
        user_id=current_user.id
    )
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

@router.get("/", response_model=List[ToDoOut])
def get_my_todos(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    todos = db.query(ToDo).filter(ToDo.user_id == current_user.id).all()
    return todos

@router.put("/{todo_id}", response_model=ToDoOut)
def update_todo(
    todo_id: int = Path(..., description="ID of the todo to update"),
    todo_data: ToDoUpdate = Depends(),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    todo = db.query(ToDo).filter(ToDo.id == todo_id, ToDo.user_id == current_user.id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    if todo_data.title is not None:
        todo.title = todo_data.title
    if todo_data.description is not None:
        todo.description = todo_data.description
    if todo_data.completed is not None:
        todo.completed = todo_data.completed

    db.commit()
    db.refresh(todo)
    return todo

@router.delete("/{todo_id}", status_code=204)
def delete_todo(
    todo_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    todo = db.query(ToDo).filter(ToDo.id == todo_id, ToDo.user_id == current_user.id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    db.delete(todo)
    db.commit()
    return

@router.get("/search", response_model=List[ToDoOut])
def search_todos(
    completed: Optional[bool] = Query(None, description="Filter by completion status"),
    keyword: Optional[str] = Query(None, description="Search in title or description"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(ToDo).filter(ToDo.user_id == current_user.id)

    if completed is not None:
        query = query.filter(ToDo.completed == completed)
    if keyword:
        keyword = f"%{keyword.lower()}%"
        query = query.filter(
            (ToDo.title.ilike(keyword)) | (ToDo.description.ilike(keyword))
        )

    return query.all()
