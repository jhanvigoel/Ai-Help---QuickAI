import { Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const GenerateImage = () => {
  const [prompt, setPrompt] = useState('')
  const [size, setSize] = useState('512x512')
  const sizes = ['256x256', '512x512', '1024x1024']

  const onSubmitHandler = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="h-screen p-6 flex flex-col md:flex-row gap-6 bg-gray-50">
      
      {/* Left Form */}
      <form 
        onSubmit={onSubmitHandler} 
        className="flex-1 p-6 bg-white shadow-md rounded-2xl border"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 text-blue-600" />
          <h1 className="text-lg font-semibold">Image Configuration</h1>
        </div>

        {/* Prompt Input */}
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Image Prompt
        </label>
        <textarea
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          rows={4}
          className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="e.g. A futuristic city skyline at sunset..."
          required
        />

        {/* Image Size Selection */}
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Image Size
        </label>
        <div className="flex flex-wrap gap-2 mt-3">
          {sizes.map((s, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setSize(s)}
              className={`px-4 py-1 text-sm rounded-full border transition ${
                size === s
                  ? 'bg-blue-100 text-blue-700 border-blue-400'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg hover:opacity-90 transition"
        >
          <Image className="w-4 h-4" />
          Generate Image
        </button>
      </form>

      {/* Right Output Preview */}
      <div className="flex-1 p-6 bg-white shadow-md rounded-2xl border min-h-[400px] flex flex-col">
        <div className="flex items-center gap-2">
          <Image className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold">Generated Image</h1>
        </div>

        <div className="flex-1 flex items-center justify-center text-center text-gray-400">
          <div>
            <Image className="w-10 h-10 mx-auto mb-3" />
            <p>Enter a prompt and click <span className="font-medium">"Generate Image"</span> to get started</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default GenerateImage
