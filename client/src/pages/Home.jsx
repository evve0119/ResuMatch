// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen font-trebuchet">
      <Navbar />
      <main className="flex items-center justify-center h-[70vh]">
        <h2 className="text-4xl md:text-5xl text-[#BFAEE7] font-semibold text-center">
          Customize your resume with an ease
        </h2>
      </main>
    </div>
  );
}
