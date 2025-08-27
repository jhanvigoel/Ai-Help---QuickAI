import React from 'react'
import bgImage from '../assets/gradientBackground.png'
import { Navigate, useNavigate } from 'react-router-dom'

const Hero = () => {

    const navigate = useNavigate();
  return (
    <div 
      className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 sm:px-20 xl:px-32"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >

      <div className="relative z-10 max-w-3xl border border-black/20 backdrop-blur-lg rounded-2xl p-8 shadow-lg bg-white/5">
        
        <h1 className="text-4xl sm:text-6xl font-extrabold text-black">
          Create Amazing Content with <span className='text-primary'>AI Tools</span>
        </h1>
        
        <p className="mt-6 text-lg text-black-300">
          Transform your content creation with our suite of premium AI tools.  
          Write articles, generate images, and enhance your workflow.
        </p>

        <div>
            <button className = "px-6 py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
            onClick = {() => {navigate('/ai')}}>Start Creating Now</button>
        </div>

      </div>
      
    </div>
  )
}

export default Hero