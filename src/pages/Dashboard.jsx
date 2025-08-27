import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Sparkles } from 'lucide-react'
import Creations from '../components/Creations'



const Dashboard = () => {
  const [creations, setCreations] = useState([])

  const getDashboardData = async () => {
    setCreations(dummyCreationData)
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Total Creations</h1>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{creations.length}</p>
        </div>
        <div className="bg-indigo-100 p-3 rounded-full">
          <Sparkles className="w-6 h-6 text-indigo-600" />
        </div>
      </div>

      
      <div className="max-w-3xl mx-auto mt-8 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Creations</h2>
        {creations.length > 0 ? (
          <div className="space-y-4">
            {creations.map((item) => (
              <Creations key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No creations yet.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
