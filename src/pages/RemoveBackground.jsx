import { useState } from 'react'
import { Sparkles, Eraser } from 'lucide-react'

const RemoveBackground = () => {
  const [input, setInput] = useState('')

  const OnSubmitHandler = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="h-screen p-6 flex flex-col md:flex-row gap-6 bg-gray-50">
      
      {/* Left Column */}
      <form 
        onSubmit={OnSubmitHandler} 
        className="flex-1 p-6 bg-white shadow-md rounded-2xl border"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className="text-lg font-semibold">Background Removal</h1>
        </div>

        {/* Upload input */}
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input 
          onChange={(e)=> setInput(e.target.files[0])} 
          type="file" 
          accept="image/*" 
          className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none" 
          required 
        />
        <p className="text-sm text-gray-500 font-light mt-1">
          Supports JPG, PNG, and other formats
        </p>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#F6AB41] to-[#FF4938] rounded-lg hover:opacity-90 transition"
        >
          <Eraser className="w-4 h-4" />
          Remove Background
        </button>
      </form>

      {/* Right Column */}
      <div className="flex-1 p-6 bg-white shadow-md rounded-2xl border min-h-[400px] flex flex-col">
        <div className="flex items-center gap-2">
          <Eraser className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-lg font-semibold">Processed Image</h1>
        </div>

        {/* Placeholder */}
        <div className="flex-1 flex items-center justify-center text-center text-gray-400">
          <div>
            <Eraser className="w-10 h-10 mx-auto mb-3" />
            <p>
              Upload an image and click <span className="font-medium">"Remove Background"</span> to get started
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RemoveBackground
