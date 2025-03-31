// src/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/'); // redirect to home
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.error || 'Login failed'));
    }
  };

  return (
    <div className="min-h-screen bg-white font-trebuchet">
      <Navbar />

      {/* <div className="min-h-[80vh] flex items-center justify-center px-4"> */}
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xs flex flex-col items-center">
          <form onSubmit={handleLogin} className="w-full">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 outline-none"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-6 outline-none"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#BFAEE7] text-white font-semibold py-2 rounded-full hover:bg-[#A88FDB] transition"
            >
              Login
            </button>

            {/* Error message inside the form */}
            {message && (
              <p className="mt-4 text-center text-red-500 text-sm">{message}</p>
            )}
          </form>

          {/* Sign up link BELOW the form */}
          <p className="text-sm text-center mt-4 text-gray-700">
            New to ResuMate?{' '}
            <Link to="/signup" className="text-[#320C8A] font-semibold hover:underline">
              Sign Up Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
