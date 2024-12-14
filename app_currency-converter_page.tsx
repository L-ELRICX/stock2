'use client'

import { useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'

const API_KEY = '648e4ca037ff390535ca7ec78068ebe9'

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR']

  const handleConvert = async () => {
    if (!amount) return

    setLoading(true)
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      )
      const data = await response.json()
      const rate = data.rates[toCurrency]
      setResult(parseFloat(amount) * rate)
    } catch (error) {
      console.error('Error converting currency:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8">Currency Converter</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded-md"
                placeholder="Enter amount"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded-md"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded-md"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              onClick={handleConvert}
              disabled={loading}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center justify-center"
            >
              {loading ? (
                'Converting...'
              ) : (
                <>
                  Convert <ArrowLeftRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
            
            {result !== null && (
              <div className="mt-4 p-4 bg-gray-700 rounded-md">
                <p className="text-lg font-semibold">
                  {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

