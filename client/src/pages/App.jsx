// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Account from './Account';
import CreateResume from './CreateResume';
import SavedResumes from './SavedResumes';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />}/>
        <Route path="/create" element={<CreateResume />} />
        <Route path="/saveresume" element={<SavedResumes />} />

      </Routes>
    </Router>
  );
}
