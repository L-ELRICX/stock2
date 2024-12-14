'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart2, TrendingUp, DollarSign, AlertCircle, ArrowUpRight, ArrowDownRight, BookOpen, Search } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { NewsFeed } from '@/components/NewsFeed'
import { StockTrends } from '@/components/StockTrends'
import Link from 'next/link'

// Mock API for fetching user data
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        portfolioValue: 125000,
        totalGain: 15.3,
        cashBalance: 10500,
        riskLevel: 'Moderate',
        stockData: [
          { date: '2023-01-01', value: 100000 },
          { date: '2023-02-01', value: 105000 },
          { date: '2023-03-01', value: 102000 },
          { date: '2023-04-01', value: 110000 },
          { date: '2023-05-01', value: 115000 },
          { date: '2023-06-01', value: 112000 },
          { date: '2023-07-01', value: 125000 },
        ],
        transactions: [
          { id: 1, type: 'buy', stock: 'AAPL', amount: 5000, date: '2023-07-01' },
          { id: 2, type: 'sell', stock: 'GOOGL', amount: 3200, date: '2023-06-28' },
          { id: 3, type: 'buy', stock: 'MSFT', amount: 2800, date: '2023-06-25' },
          { id: 4, type: 'buy', stock: 'AMZN', amount: 4200, date: '2023-06-20' },
          { id: 5, type: 'sell', stock: 'TSLA', amount: 3500, date: '2023-06-15' },
        ],
      })
    }, 1000)
  })
}

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stockSymbol, setStockSymbol] = useState('')
  const router = useRouter()

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(userLoggedIn)
    if (!userLoggedIn) {
      router.push('/login')
    } else {
      fetchUserData().then((data) => {
        setUserData(data)
        setIsLoading(false)
      })
    }
  }, [router])

  const handlePredict = () => {
    if (stockSymbol) {
      router.push(`/predict/${stockSymbol}`)
    }
  }

  if (!isLoggedIn || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <div className="space-x-4">
          <Link
            href="/currency-converter"
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            Currency Converter
          </Link>
          <Link
            href="/profile"
            className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md"
          >
            Profile Settings
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Enter stock symbol"
              value={stockSymbol}
              onChange={(e) => setStockSymbol(e.target.value)}
              className="w-full p-2 pl-10 bg-gray-700 rounded-md text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={handlePredict}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            Predict
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <BarChart2 className="h-8 w-8 text-blue-500 mb-2" />
          <h2 className="text-xl font-bold mb-2">Portfolio Value</h2>
          <p className="text-3xl font-bold">₹{userData.portfolioValue.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
          <h2 className="text-xl font-bold mb-2">Total Gain</h2>
          <p className="text-3xl font-bold text-green-500">+{userData.totalGain}%</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <DollarSign className="h-8 w-8 text-yellow-500 mb-2" />
          <h2 className="text-xl font-bold mb-2">Cash Balance</h2>
          <p className="text-3xl font-bold">₹{userData.cashBalance.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
          <h2 className="text-xl font-bold mb-2">Risk Level</h2>
          <p className="text-3xl font-bold">{userData.riskLevel}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">Portfolio Performance</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={userData.stockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
              <ul className="space-y-4">
                {userData.transactions.map((transaction) => (
                  <li key={transaction.id} className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <div>
                      <span className={`font-bold ${transaction.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                        {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.stock}
                      </span>
                      <p className="text-sm text-gray-400">{transaction.date}</p>
                    </div>
                    <span className={`font-bold ${transaction.type === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.type === 'buy' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <ArrowUpRight className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <p className="font-bold">Buy NVDA</p>
                    <p className="text-sm text-gray-400">Strong growth potential in AI sector</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <ArrowDownRight className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <p className="font-bold">Sell TSLA</p>
                    <p className="text-sm text-gray-400">Increased competition in EV market</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <p className="font-bold">Hold AAPL</p>
                    <p className="text-sm text-gray-400">Stable performance, wait for next earnings report</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <StockTrends />
          <NewsFeed />
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Educational Resources</h2>
            <a
              href="https://youtu.be/3UF0ymVdYLA"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-purple-500 hover:bg-purple-600 rounded-md text-center flex items-center justify-center"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Learn About Stocks
            </a>
            <p className="mt-4 text-sm text-gray-400">
              New to stock trading? Watch our comprehensive guide to get started with the basics of stock market investing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

