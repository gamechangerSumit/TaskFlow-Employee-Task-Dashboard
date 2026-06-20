import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, CheckSquare, X } from 'lucide-react'
import { useEffect } from 'react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: PlusCircle, label: 'Add Task', path: '/add' },
  ]

  
  useEffect(() => {
    if (isOpen) {
      onClose()
    }
  }, [location.pathname]) // pathnametrigger

  // FIX 2: Body scroll lock - SSR safe
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col z-50
          transition-transform duration-300 ease-in-out
          ${isOpen? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">TaskFlow</span>
          </div>

          {/* Close button - Mobile/Tablet only */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                   ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
            © 2026 TaskFlow
          </p>
        </div>
      </aside>
    </>
  )
}