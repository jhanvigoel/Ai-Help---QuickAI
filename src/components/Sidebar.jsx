import { useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const navItems = [
    {to: '/ai',label: 'Dashboard',Icon: House},
    {to: '/ai/write-article',label: 'Write Article',Icon: SquarePen},
    {to: '/ai/blog-titles',label: 'Blog Title',Icon: Hash},
    {to: '/ai/generate-images',label: 'Generate Images',Icon: Image},
    {to: '/ai/remove-background',label: 'Remove Background',Icon: Eraser},
    {to: '/ai/remove-object',label: 'Remove Object',Icon: Scissors},
    {to: '/ai/review-resume',label: 'Resume Review',Icon: FileText},
    {to: '/ai/community',label: 'Community',Icon: Users}
]

const Sidebar = ({sidebar,setSidebar}) => {
    const { isLoaded, isSignedIn, user } = useUser(); 
    const {signOut,openUserProfile} = useClerk();

  return (
    <div className={`${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} 
        w-64 h-screen flex flex-col justify-between bg-white border-r shadow-sm`}>

        {/* Top Section */}
        <div className="my-7">
            <img src={user.imageUrl} alt="UserAvatar" className="w-20 h-20 rounded-full mx-auto" />
            <h1 className="text-center mt-2 font-semibold text-gray-800">{user.fullName}</h1>

            <div className="mt-6 flex flex-col gap-1">
                {navItems.map(({to,label,Icon}) => (
                    <NavLink key={to} to={to} end={to === '/ai'} 
                        onClick={() => setSidebar(false)} 
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition 
                            ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`
                        }>
                        <Icon className="w-5 h-5" />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </div>
        </div>

        {/* Footer Section */}
        <div className="w-full bg-gray-100 shadow-inner p-3 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
                <img
                    src={user.imageUrl}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
                    onClick={openUserProfile}
                />
                <h4 className="text-gray-800 font-semibold text-lg m-0">{user.fullName}</h4>
            </div>
            <LogOut onClick={signOut} className="cursor-pointer text-gray-700 hover:text-red-500" />
        </div>
    </div>
  )
}

export default Sidebar
