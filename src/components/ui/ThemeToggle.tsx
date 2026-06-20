import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // SSR fix 
  useEffect(() => {
    setMounted(true)
    const isDark = 
      localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDark(isDark)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }, [dark, mounted])

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gray-100 dark:bg-gray-800" />
    )
  }

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 md:p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 transition-all"
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {dark ? (
        <Sun className="w-5 h-5 text-amber-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  )
}