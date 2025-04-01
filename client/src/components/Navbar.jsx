import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSignout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleCraftClick = () => {
    if (!isLoggedIn) {
      alert('Please log in to use the functionality for Accenture.');
    } else {
      navigate('/create');
    }
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center font-trebuchet">
      <Link to="/" className="text-3xl font-bold text-[#BFAEE7]">
        Resu<span className="text-[#320C8A]">Match</span>
      </Link>

      <div className="flex items-center space-x-6 text-[#320C8A] font-medium">
        {isLoggedIn ? (
          <>
            <Link to="/saveresume">
              resume
            </Link>
            <Link to="/account">my account</Link>
            <button
              onClick={handleSignout}
              className="text-[#320C8A] hover:underline"
            >
              sign out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">login/signup</Link>
          </>
        )}

        <button
          onClick={handleCraftClick}
          className="ml-4 bg-[#BFAEE7] text-white px-4 py-1 rounded-full shadow-sm hover:bg-[#A88FDB]"
        >
          craft my resume
        </button>
      </div>
    </nav>
  );
}
