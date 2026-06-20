import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  color: 'green' | 'orange' | 'red' | 'blue' | 'gray'
  size?: 'sm' | 'md'
}

export default function Badge({ children, color, size = 'md' }: BadgeProps) {
  const colors = {
    green: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] md:text-xs',
    md: 'px-2 md:px-2.5 py-0.5 md:py-1 text-xs md:text-sm'
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium whitespace-nowrap ${colors[color]} ${sizes[size]}`}>
      {children}
    </span>
  )
}