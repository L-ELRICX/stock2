'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUp, ArrowDown } from 'lucide-react'

// This is a placeholder for the actual API call
const fetchStockData = async (symbol: string) => {
  // In a real application, you would use the API key to fetch data
  // const API_KEY = 'onm7LbWaeyUWQAWyx67dTnrCZKXRvaJK60dbgShl'
  
  // Simulated API response
  return {
    open: 150.25,
    high: 152.30,
    low: 149.80,
    close: 151.50,
    adjustedClose: 151.50,
    volume: 1000000,
  }
}

export default function PredictPage({ params }: { params: { symbol: string } }) {
  const [stockData, setStockData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStockData(params.symbol)
        setStockData(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching stock data:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.symbol])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <button
        onClick={() => router.back()}
        className="mb-8 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
      >
        Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-8">Stock Analysis: {params.symbol}</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(stockData).map(([key, value]) => (
          <div key={key} className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h2>
            <p className="text-3xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Analysis Dashboard</h2>
        <p className="text-lg">
          # Placeholder for model prediction logic
        </p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Prediction Summary</h2>
        <p className="text-lg">
          According to the ML prediction and analysis, in accordance with the {params.symbol} stock, a 
          <span className="font-bold text-green-500"> #prediction of RISE</span> of the given stock is expected.
        </p>
        <div className="mt-4 flex items-center">
          <ArrowUp className="text-green-500 mr-2" size={24} />
          <span className="text-2xl font-bold text-green-500">+5.2%</span>
        </div>
      </div>
    </div>
  )
}

