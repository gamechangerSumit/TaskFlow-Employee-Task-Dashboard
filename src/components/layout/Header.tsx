import { Search, Bell, Sun, Moon, User, Settings, Edit2, Check } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [userName, setUserName] = useState('User')
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState('User')
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mount hone ke baad hi localStorage access kar
  useEffect(() => {
    setMounted(true)
    
    // Load name
    try {
      const savedName = localStorage.getItem('userName')
      if (savedName) {
        setUserName(savedName)
        setTempName(savedName)
      }
    } catch (e) {
      console.error('localStorage error:', e)
    }

    // Load theme
    try {
      const isDark = localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
      setDark(isDark)
    } catch (e) {
      console.error('Theme error:', e)
    }
  }, [])

  // Dark mode toggle
  useEffect(() => {
    if (!mounted) return
    
    try {
      if (dark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    } catch (e) {
      console.error('Theme save error:', e)
    }
  }, [dark, mounted])

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current &&!notifRef.current.contains(event.target as Node)) {
        setShowNotif(false)
      }
      if (profileRef.current &&!profileRef.current.contains(event.target as Node)) {
        setShowProfile(false)
        setIsEditing(false)
        setTempName(userName)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userName])

  // Focus input when editing
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSaveName = () => {
    const trimmed = tempName.trim()
    if (trimmed) {
      setUserName(trimmed)
      try {
        localStorage.setItem('userName', trimmed)
        window.dispatchEvent(new CustomEvent('userNameChanged', { detail: trimmed }))
      } catch (e) {
        console.error('Save name error:', e)
      }
      setIsEditing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveName()
    if (e.key === 'Escape') {
      setIsEditing(false)
      setTempName(userName)
    }
  }

  // Prevent hydration mismatch - render nahi kar jab tak mount nahi hua
  if (!mounted) {
    return (
      <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6 lg:px-8 sticky top-0 z-10">
        <div className="flex-1"></div>
        <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
      </header>
    )
  }

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6 lg:px-8 sticky top-0 z-10">
      <div className="flex-1 max-w-md">
        <div className="hidden sm:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white text-sm"
          />
        </div>

        <button
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="sm:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {showMobileSearch && (
        <div className="absolute top-16 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sm:hidden z-20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              autoFocus
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white text-sm"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotif(!showNotif)
              setShowProfile(false)
            }}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 p-4 z-20">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Notifications</h3>
              <div className="space-y-3">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg">
                  <p className="text-sm text-gray-900 dark:text-white font-medium">Task Due Soon</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Design Homepage is due tomorrow</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-900 dark:text-white font-medium">New Feature</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Drag & drop is now available!</p>
                </div>
              </div>
              <button className="w-full mt-3 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                Mark all as read
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={dark? 'Light Mode' : 'Dark Mode'}
        >
          {dark? <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfile(!showProfile)
              setShowNotif(false)
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center text-white font-medium transition-colors text-sm sm:text-base"
          >
            {userName.charAt(0).toUpperCase()}
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 p-3 z-20">
              <div className="px-2 py-2 border-b border-gray-200 dark:border-gray-800 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Display Name</p>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      title="Edit Name"
                    >
                      <Edit2 className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                    </button>
                  )}
                </div>

                {isEditing? (
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      maxLength={20}
                      placeholder="Enter name"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                      title="Save"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{userName}</p>
                )}
              </div>

              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center gap-2 transition-colors">
                <User className="w-4 h-4" />
                Profile
              </button>

              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded flex items-center gap-2 transition-colors">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}