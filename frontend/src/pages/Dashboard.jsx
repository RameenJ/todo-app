import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingTodo, setEditingTodo] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const fetchTodos = async () => {
    const res = await API.get("/todos/");
    setTodos(res.data);
  };

  const addTodo = async e => {
    e.preventDefault();
    await API.post("/todos/", form);
    setForm({ title: "", description: "" });
    fetchTodos();
  };

  const deleteTodo = async id => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  const toggleComplete = async todo => {
    await API.put(`/todos/${todo.id}`, { completed: !todo.completed });
    fetchTodos();
  };

  const openEditModal = todo => {
    setEditingTodo(todo);
    setEditForm({ title: todo.title, description: todo.description });
  };

  const closeModal = () => setEditingTodo(null);

  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const submitEdit = async () => {
    await API.put(`/todos/${editingTodo.id}`, editForm);
    closeModal();
    fetchTodos();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-center">📋 Your Todos</h1>

      <form onSubmit={addTodo} className="space-y-3">
        <input value={form.title} name="title" onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="input" />
        <input value={form.description} name="description" onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" className="input" />
        <button type="submit" className="btn">Add Todo</button>
      </form>

      <ul className="space-y-3">
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
            <div>
              <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo)} className="mr-2" />
              <span className={todo.completed ? "line-through text-gray-400" : ""}>
                <strong>{todo.title}</strong><br />
                <small>{todo.description}</small>
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEditModal(todo)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => deleteTodo(todo.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={logout} className="btn bg-gray-400 mt-6">Logout</button>

      {editingTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96 shadow">
            <h2 className="text-lg font-bold mb-4">Edit Todo</h2>
            <input name="title" value={editForm.title} onChange={handleEditChange} placeholder="Title" className="input mb-2" />
            <input name="description" value={editForm.description} onChange={handleEditChange} placeholder="Description" className="input mb-2" />
            <div className="flex justify-end gap-2">
              <button onClick={closeModal} className="btn bg-gray-300 text-black">Cancel</button>
              <button onClick={submitEdit} className="btn bg-blue-600">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
