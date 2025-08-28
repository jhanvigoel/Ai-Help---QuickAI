import { Sparkles, FileText } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'

const BlogTitles = () => {
  const [input, setInput] = useState('')
  const [tone, setTone] = useState('Casual')
  const [loading, setLoading] = useState(false)
  const [titles, setTitles] = useState([])

  const tones = ['Casual', 'Professional', 'Funny', 'Inspirational']

  const OnSubmitHandler = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    try {
      setLoading(true)
      setTitles([])

      // 🔹 API call (replace with your backend route)
      const res = await axios.post('/api/ai/generate-blog-titles', {
        topic: input,
        tone: tone,
      })

      setTitles(res.data.titles) // assuming response looks like { titles: ["..", ".."] }
    } catch (error) {
      console.error("Error generating blog titles:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen p-6 flex flex-col md:flex-row gap-6 bg-gray-50">
      
      {/* Left: Blog Title Configuration */}
      <form 
        onSubmit={OnSubmitHandler} 
        className="flex-1 p-6 bg-white shadow-md rounded-2xl border"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 text-purple-600" />
          <h1 className="text-lg font-semibold">Blog Title Configuration</h1>
        </div>

        {/* Blog Topic */}
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Blog Topic
        </label>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          placeholder="e.g. The Future of Remote Work..."
          required
        />

        {/* Tone Selection */}
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Writing Tone
        </label>
        <div className="flex flex-wrap gap-2 mt-3">
          {tones.map((item, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setTone(item)}
              className={`px-4 py-1 text-sm rounded-full border transition ${
                tone === item
                  ? 'bg-purple-100 text-purple-700 border-purple-400'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          <FileText className="w-4 h-4" />
          {loading ? "Generating..." : "Generate Blog Titles"}
        </button>
      </form>

      {/* Right: Generated Titles */}
      <div className="flex-1 p-6 bg-white shadow-md rounded-2xl border min-h-[400px] flex flex-col">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-600" />
          <h1 className="text-lg font-semibold">Generated Blog Titles</h1>
        </div>

        <div className="flex-1 mt-4 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-400">⏳ Generating titles...</p>
          ) : titles.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {titles.map((title, i) => (
                <li key={i}>{title}</li>
              ))}
            </ul>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center text-gray-400">
              <div>
                <FileText className="w-10 h-10 mx-auto mb-3" />
                <p>
                  Enter a topic and click{" "}
                  <span className="font-medium">"Generate Blog Titles"</span> to
                  get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default BlogTitles
