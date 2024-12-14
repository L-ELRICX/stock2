'use client'

import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'

interface NewsItem {
  title: string
  link: string
  pubDate: string
}

export function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real application, this would fetch from your backend API
    // that proxies the Yahoo Finance RSS feed
    const fetchNews = async () => {
      try {
        // Simulated news data
        const mockNews = [
          {
            title: "Stock Market Today: Dow Edges Lower as Tech Rally Pauses",
            link: "https://finance.yahoo.com/topic/stock-market-news/",
            pubDate: new Date().toISOString()
          },
          {
            title: "Wall Street Analysts Predict Strong Q4 Earnings",
            link: "https://finance.yahoo.com/topic/stock-market-news/",
            pubDate: new Date().toISOString()
          },
          {
            title: "Global Markets React to Economic Data",
            link: "https://finance.yahoo.com/topic/stock-market-news/",
            pubDate: new Date().toISOString()
          }
        ]
        setNews(mockNews)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching news:', error)
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return <div className="text-center">Loading news...</div>
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Market News</h2>
        <a
          href="https://finance.yahoo.com/topic/stock-market-news/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400 flex items-center"
        >
          View All <ExternalLink className="h-4 w-4 ml-1" />
        </a>
      </div>
      <div className="space-y-4">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400">
              {new Date(item.pubDate).toLocaleDateString()}
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}

