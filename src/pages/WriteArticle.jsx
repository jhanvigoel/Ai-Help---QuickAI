import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' }
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const OnSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text}`

      const { data } = await axios.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="h-screen p-6 flex flex-col md:flex-row gap-6 bg-gray-50">
      {/* Left column (form) */}
      <form
        onSubmit={OnSubmitHandler}
        className="flex-1 p-6 bg-white shadow-md rounded-2xl border"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 text-blue-600" />
          <h1 className="text-lg font-semibold">Article Configuration</h1>
        </div>

        <label className="block mt-6 text-sm font-medium text-gray-700">
          Article Topic
        </label>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="e.g. The Future of Artificial Intelligence..."
          required
        />

        <label className="block mt-6 text-sm font-medium text-gray-700">
          Article Length
        </label>
        <div className="flex flex-wrap gap-2 mt-3">
          {articleLength.map((item, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setSelectedLength(item)}
              className={`px-4 py-1 text-sm rounded-full border transition ${
                selectedLength.text === item.text
                  ? 'bg-blue-100 text-blue-700 border-blue-400'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {item.text}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg hover:opacity-90 transition"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Edit className="w-4 h-4" />
          )}
          Generate Article
        </button>
      </form>

      {/* Right column (output) */}
      <div className="flex-1 p-6 bg-white shadow-md rounded-2xl border min-h-[400px] flex flex-col">
        <div className="flex items-center gap-2">
          <Edit className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold">Generated Article</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex items-center justify-center text-center text-gray-400">
            <div>
              <Edit className="w-10 h-10 mx-auto mb-3" />
              <p>
                Enter a topic and click{' '}
                <span className="font-medium">"Generate Article"</span> to get
                started
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-gray-700">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default WriteArticle
