import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post("/auth/signup", form);
    navigate("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <input name="username" onChange={handleChange} placeholder="Username" className="input" />
      <input name="email" onChange={handleChange} placeholder="Email" type="email" className="input" />
      <input name="password" onChange={handleChange} placeholder="Password" type="password" className="input" />
      <button type="submit" className="btn">Sign Up</button>
    </form>
  );
}
