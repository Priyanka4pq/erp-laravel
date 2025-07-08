'use client'

import { Menu, Bell, Search } from 'lucide-react'
import { useState } from 'react'

export function SubAdminHeader({ toggleSidebar }) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-teal-600 text-white z-50 flex items-center justify-between px-4 shadow-md">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden block p-2 rounded-md hover:bg-teal-500"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="h-8 w-8 rounded-full bg-white text-teal-600 flex items-center justify-center font-bold text-lg">
          SA
        </div>
        <h1 className="font-bold text-lg">Sub Admin Panel</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 hover:bg-teal-500 rounded-md"
          >
            <Search className="h-5 w-5" />
          </button>
          {searchOpen && (
            <input
              type="text"
              placeholder="Search..."
              className="absolute right-0 top-10 w-64 p-2 rounded-md bg-white text-gray-800 shadow-lg"
            />
          )}
        </div>
        <Bell className="h-5 w-5 hover:text-gray-200" />
        <div className="h-8 w-8 bg-teal-500 rounded-full flex items-center justify-center font-semibold">
          SA
        </div>
      </div>
    </header>
  )
}
