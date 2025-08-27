import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { Menu, X } from 'lucide-react';
import Navbar from '../components/navbar';
import Sidebar from '../components/Sidebar';
import { SignIn,useUser } from '@clerk/clerk-react';

const Layout = () => {

    const navigate = useNavigate();
    const [sidebar,setSidebar] = useState(false);
    const {user} = useUser();

  return user ? (

    <>
      
      <div className="flex h-screen">
        
        <div className={`${sidebar ? "w-64" : "w-0"} transition-all duration-300`}>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </div>

        <div className="flex-1 bg-gray-50">
        
          <nav className="p-4 flex items-center justify-between bg-white shadow">
            <img 
              src={assets.logo} 
              alt="Logo" 
              className="h-8 cursor-pointer"
              onClick={() => navigate('/')} 
            />

            {sidebar ? (
              <X className="cursor-pointer" onClick={() => setSidebar(false)} />
            ) : (
              <Menu className="cursor-pointer" onClick={() => setSidebar(true)} />
            )}
          </nav>

          
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className = 'flex justify-center items-center h-screen'>
        <SignIn />
    </div>
  )
}

export default Layout