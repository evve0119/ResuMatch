// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

function Main() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <h1 className="text-5xl font-bold mb-10 text-gray-800">ResuMatch</h1>
      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Login</button>
        </Link>
        <Link to="/signup">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}
