import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.access_token);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <input name="email" onChange={handleChange} placeholder="Email" type="email" className="input" />
      <input name="password" onChange={handleChange} placeholder="Password" type="password" className="input" />
      <button type="submit" className="btn">Login</button>
    </form>
  );
}