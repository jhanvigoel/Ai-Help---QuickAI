import { useState } from 'react'
import { Sparkles, Scissors, Loader2, Download } from 'lucide-react'
import toast from 'react-hot-toast'

const RemoveObject = () => {
  const [input, setInput] = useState('')
  const [object, setObject] = useState('')
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState(null)

  const OnSubmitHandler = async (e) => {
    e.preventDefault()

    if (!input || !object) {
      toast.error("Please upload an image and describe the object.")
      return
    }

    try {
      setLoading(true)
      setOutput(null)

      const formData = new FormData()
      formData.append("image", input) 
      formData.append("object", object)

      console.log('Sending image for object removal...');
      
      
      const res = await fetch("/api/ai/remove-image-object", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to process image");
      }

      const data = await res.json()
      console.log('Response received:', data);
      
      if (data.success) {
        setOutput(data.url || data.content) 
        toast.success("Object removed successfully!")
      } else {
        toast.error(data.message || "Failed to process image")
      }
    } catch (err) {
      console.error('Object removal error:', err);
      if (err.message) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong. Try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen p-6 flex flex-col md:flex-row gap-6 bg-gray-50">
      
      
      <form 
        onSubmit={OnSubmitHandler} 
        className="flex-1 p-6 bg-white shadow-md rounded-2xl border"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-lg font-semibold">Object Removal</h1>
        </div>

        
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input 
          onChange={(e)=> setInput(e.target.files[0])} 
          type="file" 
          accept="image/*" 
          className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" 
          required 
        />
        <p className="text-sm text-gray-500 font-light mt-1">
          Supports JPG, PNG, and other formats
        </p>

        
        <label className="block mt-6 text-sm font-medium text-gray-700">
          Describe Object to Remove
        </label>
        <textarea 
          onChange={(e)=> setObject(e.target.value)} 
          value={object} 
          rows={3} 
          placeholder="e.g., watch or spoon (only one object)" 
          className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />

        
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#417DF6] to-[#8E37EB] rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scissors className="w-4 h-4" />}
          {loading ? "Processing..." : "Remove Object"}
        </button>
      </form>

      
      <div className="flex-1 p-6 bg-white shadow-md rounded-2xl border min-h-[400px] flex flex-col">
        <div className="flex items-center gap-2">
          <Scissors className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-lg font-semibold">Processed Image</h1>
        </div>

        
        <div className="flex-1 flex items-center justify-center text-center text-gray-400">
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-10 h-10 animate-spin text-[#4A7AFF]" />
              <p className="text-sm text-gray-500">Removing object...</p>
            </div>
          ) : output ? (
            <div className="flex flex-col items-center gap-4">
              <img 
                src={output} 
                alt="Processed result" 
                className="max-h-[300px] rounded-lg shadow-md border"
              />
              <a
                href={output}
                download="processed-image.png"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:opacity-90 transition"
              >
                <Download className="w-4 h-4" />
                Download Image
              </a>
            </div>
          ) : (
            <div>
              <Scissors className="w-10 h-10 mx-auto mb-3" />
              <p>
                Upload an image, enter an <span className="font-medium">object name</span>, and click 
                <span className="font-medium"> "Remove Object"</span> to get started
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default RemoveObject
