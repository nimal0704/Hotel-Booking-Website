import React, { useState } from 'react';
import { href, Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthContext';
import {assets} from '../assets/assets';


const Header = () => {
  const {user, login} = useAuth();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const navLink = [{label:'Discover', href:'/'}, {label:'My Bookings', href:'/bookings'},{label:'Help',href:'/Help'}];

  return(
    <header className='flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50'>
      <div className='flex text-2xl font-bold mr-1'>
        <img src={assets.logo} alt="Logo" className='h-10 inline mr-0.5'/>
        <p className='text-4xl bg-gradient-to-r from-blue-800 to-orange-500 bg-clip-text text-transparent '>Wanderora</p>
      </div>
      <nav className='flex gap-5'>
       {navLink.map((item) => (
        <Link key={item.label} to={item.href}  className='text-red-950'>
        {item.label}
        </Link>
       ))
       }
      </nav>
      
    </header>
  )
}
export default Header;