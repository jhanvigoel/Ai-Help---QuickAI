import React, { useState } from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser ,SignIn } from '@clerk/clerk-react';

const Aitools = () => {

    const navigate = useNavigate();
    const {user} = useUser();
    const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="py-16 px-6 sm:px-12 lg:px-24 bg-white">
      <div className="text-center max-w-2xl mx-auto">
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Powerful AI Tools
        </h2>
        
        
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
          Everything you need to create, enhance, and optimize your content 
          with cutting-edge AI technology.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            onClick={() => user ? navigate(tool.path) : setShowSignIn(true)}
            className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md cursor-pointer 
                 transition transform hover:scale-105 hover:shadow-lg"
          >
            <div
        className="w-12 h-12 flex items-center justify-center rounded-lg mb-4"
        style={{
          background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
        }}
      >
        <tool.Icon className="w-6 h-6 text-white" />
      </div>
            <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
            <p className="text-gray-600">{tool.description}</p>
          </div>
        ))}
      </div>

      {showSignIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <SignIn />
          </div>
        </div>
      )}

    </div>
  )
}

export default Aitools