import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api';
import { Button } from "@/components/ui/button";

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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

      // Store token and mark as just signed up
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('justSignedUp', 'true');

      setTimeout(() => {
        alert('✅ Signup successful! Redirecting...');
        navigate('/');
      }, 1500);
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-white font-trebuchet relative pt-18">
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xs flex flex-col items-center relative">
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

            <Button
              type="submit"
              className="w-full bg-[#BFAEE7] text-white font-semibold py-2 rounded-full hover:bg-[#A88FDB] transition"
            >
              Sign Up
            </Button>
          </form>

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
