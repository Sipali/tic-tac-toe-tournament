

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Auth({ setUser, user }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/game');
  }, [user, navigate]);

  // PRODUCTION + LOCAL MEIN DONO KAAM KAREGA
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const submit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';

    try {
      const res = await axios.post(`${API_URL}/api/auth${endpoint}`, form);
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      navigate('/game');
    } catch (err) {
      alert(err.response?.data?.msg || 'Wrong username/password or server down!');
    }
  };

  if (user) return null;

  return (
    <div className="auth-page min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-black">
      <div className="auth-card bg-black bg-opacity-60 p-10 rounded-2xl shadow-2xl border border-purple-500">
        <h2 className="auth-title text-4xl font-bold text-white mb-8 text-center">
          {isLogin ? 'Welcome Back!' : 'Join Tournament'}
        </h2>

        <form onSubmit={submit} className="space-y-6">
          <input
            className="auth-input w-full px-6 py-4 rounded-lg bg-gray-800 text-white text-lg border border-purple-500 focus:border-purple-300 outline-none"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            className="auth-input w-full px-6 py-4 rounded-lg bg-gray-800 text-white text-lg border border-purple-500 focus:border-purple-300 outline-none"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl py-4 rounded-lg transition">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="toggle-text text-center mt-6 text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="text-purple-400 cursor-pointer hover:underline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register Now' : 'Login Here'}
          </span>
        </p>
      </div>
    </div>
  );
}