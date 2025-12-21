import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthContext';
import {assets} from '../assets/assets';
import { Button } from "@/components/ui/button";


const Header = () => {
  const {user, logout} = useAuth();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLink = [{label:'Discover', href:'/'}, {label:'My Bookings', href:'/bookings'},{label:'Help',href:'/Help'}];

  const handleLoginClick = () => {
    setIsModelOpen(true);
  };

  // 2. New handler for logging out
  const handleLogout = () => {
    logout(); // Calls the logout function from AuthContext
  };

  

  return(
    <header className='flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50'>
      <div className='flex text-2xl font-bold mr-1'>
        <img src={assets.logo} alt="Logo" className='h-10 inline mr-0.5'/>
        <p className='text-4xl bg-gradient-to-r from-blue-800 to-orange-500 bg-clip-text text-transparent '>Wanderora</p>
      </div>
      
      {/* DESKTOP NAV*/}
      <nav className='hidden md:flex gap-5 items-center'>
       {navLink.map((item) => (
        <Link key={item.label} to={item.href}  className='flex justify-between align-center py-2 text-red-950'>
        {item.label}
        </Link>
       ))}
       <div className='flex items-center'>
          {/* 3. FIX: Check for user and access a reliable property (like email) */}
          {user ? (
            <div className='flex items-center space-x-3'>
              {/* Display User Initial from email */}
              <span className='w-10 h-10 rounded-full bg-red-950 text-white flex items-center justify-center font-semibold text-lg'>
                {user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </span>
              <Button onClick={handleLogout} variant="outline" className='text-red-950 border-red-950 hover:bg-red-50'>
                Logout
              </Button>
            </div>
          
          ) : (
            // Display Login button when logged out
            <Button onClick={handleLoginClick} className='bg-red-950 text-white hover:bg-red-800 pl-4'>
              Login
            </Button>
          )}
        </div>

      </nav>
           {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden text-3xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center gap-4 py-6">
          {navLink.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-red-950 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <>
              <span className="w-12 h-12 rounded-full bg-red-950 text-white flex items-center justify-center font-semibold text-xl">
                {user?.email?.charAt(0)?.toUpperCase() || "U"}
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-950 text-red-950"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLoginClick}
              className="bg-red-950 text-white"
            >
              Login
            </Button>
          )}
        </div>
      )}

      {/* LOGIN MODAL */}

      <LoginModal isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} />


      
    </header>
  )
}

export default Header;  