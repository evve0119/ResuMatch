// src/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmPassword') setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('❌ Passwords do not match');
      return;
    }

    try {
      const res = await api.post('/signup', {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // ⭐ 註冊成功後自動登入
      localStorage.setItem('token', res.data.token);
      window.location.href = '/'; // 讓 Navbar 能重整更新狀態
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };
  return (
    <div className="min-h-screen bg-white font-trebuchet relative">
      <Navbar />

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xs flex flex-col items-center relative">
          {/* Popup message */}
          {popup && (
            <div className="absolute -top-10 bg-green-200 text-green-800 px-4 py-2 rounded shadow">
              ✅ Successfully signed up!
            </div>
          )}

          {/* Social Sign Up */}
          <button className="flex items-center w-full border border-gray-300 rounded-full px-6 py-2 mb-4">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="h-5 w-5 mr-2" />
            <span className="text-gray-600">Sign up with LinkedIn</span>
          </button>

          <button className="flex items-center w-full border border-gray-300 rounded-full px-6 py-2 mb-4">
            <img src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png" alt="Google" className="h-5 w-5 mr-2" />
            <span className="text-gray-600">Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center w-full my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="w-full">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 outline-none"
              required
            />

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
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 outline-none"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 outline-none"
              required
            />

            {error && (
              <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#BFAEE7] text-white font-semibold py-2 rounded-full hover:bg-[#A88FDB] transition"
            >
              Sign Up
            </button>
          </form>

          {/* Login redirect */}
          <p className="text-sm text-center mt-4 text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="text-[#320C8A] font-semibold hover:underline">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
