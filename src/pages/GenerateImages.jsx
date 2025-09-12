import { Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'

const GenerateImage = () => {
  const [prompt, setPrompt] = useState('')
  const [size, setSize] = useState('512x512')
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const sizes = ['256x256', '512x512', '1024x1024']

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!prompt) return

    try {
      setLoading(true)
      setImageUrl(null)

      
      const { data } = await axios.post('/api/ai/generate-image', {
        prompt,
        publish: false 
      })

      
      if (data.success && data.content) {
        setImageUrl(data.content)
      } else {
        console.error('Image generation failed:', data.message);
        alert(data.message || 'Image generation failed.')
      }
    } catch (err) {
      console.error('Image generation failed:', err)
      if (err.response) {
        alert(err.response.data?.message || 'Server error occurred')
      } else if (err.request) {
        alert('Unable to connect to server. Please check your connection.')
      } else {
        alert('Something went wrong while generating image.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen p-6 flex flex-col md:flex-row gap-6 bg-gray-50">
      
      
      <form 
        onSubmit={onSubmitHandler} 
        className="flex-1 p-6 bg-white shadow-md rounded-2xl border"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 text-blue-600" />
          <h1 className="text-lg font-semibold">Image Configuration</h1>
        </div>

        
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

        
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? (
            <span>Generating...</span>
          ) : (
            <>
              <Image className="w-4 h-4" />
              Generate Image
            </>
          )}
        </button>
      </form>

      
      <div className="flex-1 p-6 bg-white shadow-md rounded-2xl border min-h-[400px] flex flex-col">
        <div className="flex items-center gap-2">
          <Image className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold">Generated Image</h1>
        </div>

        <div className="flex-1 flex items-center justify-center">
          {loading ? (
            <p className="text-gray-500">Generating image...</p>
          ) : imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Generated" 
              className="max-w-full max-h-[350px] rounded-lg border"
            />
          ) : (
            <div className="text-center text-gray-400">
              <Image className="w-10 h-10 mx-auto mb-3" />
              <p>
                Enter a prompt and click <span className="font-medium">"Generate Image"</span> to get started
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default GenerateImage
