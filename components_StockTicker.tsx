'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchStockData, processData, calculateMetrics } from '../utils/stockUtils'

const stockSymbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT']

export function StockTicker() {
  const [tickerData, setTickerData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const data = await Promise.all(
          stockSymbols.map(async (symbol) => {
            try {
              console.log(`Fetching data for ${symbol}...`)
              const stockData = await fetchStockData(symbol)
              console.log(`Received data for ${symbol}:`, stockData)
              const processedData = processData(stockData)
              const metrics = calculateMetrics(processedData)
              return {
                symbol,
                price: metrics.lastClose,
                change: metrics.change,
                changePercent: metrics.pctChange
              }
            } catch (error) {
              console.error(`Error fetching data for ${symbol}:`, error)
              throw error
            }
          })
        )
        console.log('All stock data fetched successfully:', data)
        setTickerData(data)
        setError(null)
      } catch (error) {
        console.error('Error in fetchTickerData:', error)
        setError(`An error occurred while fetching stock data: ${error.message}`)
      }
    }

    fetchTickerData()
    const interval = setInterval(fetchTickerData, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (error) {
    return <div className="bg-gray-800 py-4 text-red-500">{error}</div>
  }

  if (tickerData.length === 0) {
    return <div className="bg-gray-800 py-4 text-yellow-500">Loading stock data...</div>
  }

  return (
    <div className="bg-gray-800 py-4 overflow-hidden">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex space-x-8"
      >
        {tickerData.concat(tickerData).map((stock, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="font-bold">{stock.symbol}</span>
            <span>${stock.price.toFixed(2)}</span>
            <span className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
              {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

