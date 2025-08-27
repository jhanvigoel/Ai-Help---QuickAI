import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const Creations = ({ item }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white shadow-sm border rounded-xl p-4 hover:shadow-md transition">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{item.prompt}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        <button
          className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-600 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide" : "View"}
        </button>
      </div>


      {expanded && (
        <div className="mt-4">
          {item.type === "image" ? (
            <img
              src={item.content}
              alt={item.prompt}
              className="rounded-lg border max-h-60 object-cover"
            />
          ) : (
            <div className="prose prose-sm text-gray-700">
            <ReactMarkdown>
              {item.content}
            </ReactMarkdown>
          </div>


          )}
        </div>
      )}
    </div>
  )
}

export default Creations
