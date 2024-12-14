'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Lock, Trash2 } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Profile updated successfully!')
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Password changed successfully!')
  }

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      localStorage.removeItem('isLoggedIn')
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-700">
            <button
              className={`px-6 py-3 ${activeTab === 'profile' ? 'bg-gray-700' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`px-6 py-3 ${activeTab === 'security' ? 'bg-gray-700' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'profile' ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 bg-gray-700 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 bg-gray-700 rounded-md"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center justify-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  Update Profile
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Password</label>
                    <input
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      className="w-full p-2 bg-gray-700 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className="w-full p-2 bg-gray-700 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full p-2 bg-gray-700 rounded-md"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-md flex items-center justify-center"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </button>
                </form>
                
                <div className="pt-6 border-t border-gray-700">
                  <h3 className="text-xl font-bold mb-4">Delete Account</h3>
                  <p className="text-gray-400 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button
                    onClick={handleDeleteAccount}
                    className="w-full py-2 bg-red-500 hover:bg-red-600 rounded-md flex items-center justify-center"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

