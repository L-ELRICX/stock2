'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Menu, X, BarChart2, RefreshCcw, Briefcase, Facebook, Twitter, Linkedin, TrendingUp, User } from 'lucide-react'
import { StockTicker } from '../components/StockTicker'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const stockData = [
  { name: 'Jan', actual: 4000, predicted: 4100 },
  { name: 'Feb', actual: 3000, predicted: 3200 },
  { name: 'Mar', actual: 2000, predicted: 2400 },
  { name: 'Apr', actual: 2780, predicted: 2600 },
  { name: 'May', actual: 1890, predicted: 2000 },
  { name: 'Jun', actual: 2390, predicted: 2500 },
  { name: 'Jul', actual: 3490, predicted: 3200 },
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(userLoggedIn)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  const handleGetStarted = () => {
    router.push('/get-started')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart2 className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold">StockSage</span>
          </Link>
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/" className="hover:text-blue-500 transition">Home</Link>
            <Link href="#features" className="hover:text-blue-500 transition">Features</Link>
            {isLoggedIn && (
              <>
                <Link href="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  My Dashboard
                </Link>
              </>
            )}
            <Link href="#contact" className="hover:text-blue-500 transition">Contact</Link>
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Sign Up
                </Link>
                <Link href="/login" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                  Log In
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-gray-800 p-4"
        >
          <Link href="/" className="block py-2 hover:text-blue-500 transition">Home</Link>
          <Link href="#features" className="block py-2 hover:text-blue-500 transition">Features</Link>
          {isLoggedIn && (
            <Link href="/dashboard" className="block py-2 hover:text-blue-500 transition">My Dashboard</Link>
          )}
          <Link href="#contact" className="block py-2 hover:text-blue-500 transition">Contact</Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="block py-2 hover:text-blue-500 transition">My Dashboard</Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 hover:text-red-500 transition">Log Out</button>
            </>
          ) : (
            <>
              <Link href="/signup" className="block py-2 hover:text-blue-500 transition">Sign Up</Link>
              <Link href="/login" className="block py-2 hover:text-blue-500 transition">Log In</Link>
            </>
          )}
        </motion.div>
      )}

      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Predict the Future of Stocks
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl mb-8"
        >
          Harness the power of AI to make informed investment decisions
        </motion.p>
        {!isLoggedIn && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-600 transition"
            onClick={handleGetStarted}
          >
            Get Started
          </motion.button>
        )}
      </header>

      {/* Live Stock Ticker */}
      <StockTicker />

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose StockSage?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: BarChart2, title: "Advanced Analytics", description: "Leverage cutting-edge AI models for accurate predictions" },
            { icon: RefreshCcw, title: "Real-time Updates", description: "Get the latest market data and predictions instantly" },
            { icon: Briefcase, title: "Portfolio Management", description: "Optimize your investments with personalized recommendations" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sample Chart */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Accurate Predictions</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Price" />
              <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Predicted Price" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { name: "John Doe", role: "Day Trader", content: "StockSage has revolutionized my trading strategy. The AI predictions are spot-on!" },
            { name: "Jane Smith", role: "Portfolio Manager", content: "I've seen a significant improvement in my clients' returns since using StockSage." },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <p className="mb-4">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="bg-blue-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Predicting?</h2>
            <p className="mb-8">Join thousands of investors who are already using StockSage to make smarter decisions.</p>
            <button onClick={handleGetStarted} className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition">
              Sign Up Now
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">StockSage</h3>
              <p>Empowering investors with AI-driven stock predictions.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-blue-500 transition">Home</Link></li>
                <li><Link href="#features" className="hover:text-blue-500 transition">Features</Link></li>
                <li><Link href="/about" className="hover:text-blue-500 transition">About Us</Link></li>
                <li><Link href="#contact" className="hover:text-blue-500 transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <p>Email: shivamkaushik55x0@gmail.com</p>
              <p>Phone: +91 9329365618</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/stockhomesindia/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition"><Facebook /></a>
                <a className="hover:text-blue-500 transition cursor-not-allowed"><Twitter /></a>
                <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition"><Linkedin /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

