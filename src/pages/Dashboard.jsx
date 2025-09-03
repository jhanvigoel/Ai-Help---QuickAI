import React, { useEffect, useState } from 'react'
import { Sparkles, GemIcon } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Creations from '../components/Creations'

// ✅ Set axios base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

const Dashboard = () => {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  // ✅ Fetch dashboard data
  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* 🔹 Total Creations Card */}
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Total Creations</h1>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{creations.length}</p>
        </div>
        <div className="bg-indigo-100 p-3 rounded-full">
          <Sparkles className="w-6 h-6 text-indigo-600" />
        </div>
      </div>

      {/* 🔹 Active Plan Card */}
      <div className="max-w-md mx-auto mt-6 bg-white shadow-lg rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Active Plan</h1>
          <p className="text-xl font-bold text-purple-600 mt-2">
            <Protect plan="premium" fallback="Free">Premium</Protect>
          </p>
        </div>
        <div className="bg-purple-100 p-3 rounded-full">
          <GemIcon className="w-6 h-6 text-purple-600" />
        </div>
      </div>

      {/* 🔹 Recent Creations */}
      <div className="max-w-3xl mx-auto mt-8 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Creations</h2>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        ) : creations.length > 0 ? (
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
