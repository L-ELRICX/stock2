'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Loader } from 'lucide-react'

const API_KEY = 'so6pkDB3tAd3em0IBeWzy3nTVpB_zm2V'

interface StockTrend {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export function StockTrends() {
  const [trends, setTrends] = useState<StockTrend[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        // In a real application, this API call would be made through a backend service to protect the API key
        const response = await fetch(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`)
        const data = await response.json()

        if (data['top_gainers']) {
          const formattedTrends = data['top_gainers'].slice(0, 5).map((stock: any) => ({
            symbol: stock.ticker,
            price: parseFloat(stock.price),
            change: parseFloat(stock.change_amount),
            changePercent: parseFloat(stock.change_percentage),
          }))
          setTrends(formattedTrends)
        } else {
          setError('Unable to fetch stock trends')
        }
      } catch (err) {
        setError('An error occurred while fetching stock trends')
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrends()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
        <Loader className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Latest Stock Trends</h2>
      <div className="space-y-4">
        {trends.map((stock) => (
          <div key={stock.symbol} className="flex items-center justify-between">
            <div>
              <span className="font-bold">{stock.symbol}</span>
              <span className="ml-2 text-gray-400">${stock.price.toFixed(2)}</span>
            </div>
            <div className={`flex items-center ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              <span>{stock.change.toFixed(2)}</span>
              <span className="ml-1">({stock.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

