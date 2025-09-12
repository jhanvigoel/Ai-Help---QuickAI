import { useState } from 'react'
import { Sparkles, FileText } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const ReviewResume = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const OnSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('resume', input)

      const { data } = await axios.post(
        '/api/ai/resume-review',
        formData,
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
      
      
      <form 
        onSubmit={OnSubmitHandler} 
        className="flex-1 p-6 bg-white shadow-md rounded-2xl border"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 text-[#00DA83]" />
          <h1 className="text-lg font-semibold">Resume Review</h1>
        </div>

        
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Upload Resume
        </label>
        <input 
          onChange={(e)=> setInput(e.target.files[0])} 
          type="file" 
          accept="application/pdf" 
          className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none text-gray-600" 
          required 
        />
        <p className="text-sm text-gray-500 font-light mt-1">
          Supports PDF Resume Only.
        </p>


        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#00DA83] to-[#009BB3] rounded-lg hover:opacity-90 transition"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <FileText className="w-4 h-4" />
          )}
          Review Resume
        </button>
      </form>

      
      <div className="flex-1 p-6 bg-white shadow-md rounded-2xl border min-h-[400px] flex flex-col">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#00DA83]" />
          <h1 className="text-lg font-semibold">Analysis Results</h1>
        </div>

       
        {!content ? (
          <div className="flex-1 flex items-center justify-center text-center text-gray-400">
            <div>
              <FileText className="w-10 h-10 mx-auto mb-3" />
              <p>
                Upload a resume and click <span className="font-medium">"Review Resume"</span> to get started
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

export default ReviewResume
