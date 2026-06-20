import { createContext, useContext, ReactNode, useEffect, useState, useRef } from 'react'
import { Task, TaskFormData } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'
import toast from 'react-hot-toast'

interface TaskContextType {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>> // Drag & Drop
  loading: boolean // API loading
  addTask: (task: TaskFormData) => void
  deleteTask: (id: string) => void
  updateTask: (id: string, updatedData: Partial<Task>) => void
  toggleTaskStatus: (id: string) => void
  getTaskById: (id: string) => Task | undefined
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('employee-tasks', [])
  const [loading, setLoading] = useState(true)
  const hasFetched = useRef(false)

  // useEffect 1: JSONPlaceholder API For initial tasks loading - SSR SAFE
  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const fetchTasks = async () => {
      // SSR check - window available hone ke baad hi localStorage access kar
      if (typeof window === 'undefined') {
        setLoading(false)
        return
      }

      const saved = localStorage.getItem('employee-tasks')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setLoading(false)
            return
          }
        } catch (e) {
          console.error('Failed to parse saved tasks')
        }
      }

      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
        if (!res.ok) throw new Error('API failed')

        const data = await res.json()

        const apiTasks: Task[] = data.map((item: any) => ({
          id: crypto.randomUUID(),
          title: item.title.charAt(0).toUpperCase() + item.title.slice(1),
          description: 'Fetched from JSONPlaceholder API',
          priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as Task['priority'],
          status: item.completed? 'Completed' : 'Pending',
          dueDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          category: 'General',
          createdAt: new Date().toISOString()
        }))

        setTasks(apiTasks)
        toast.success('5 tasks loaded from API!')
      } catch (error) {
        console.error('API Error:', error)
        toast.error('Failed to load API tasks')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [setTasks])

  // useEffect 2: Auto-sort tasks by dueDate - FIXED LOOP
  useEffect(() => {
    if (!loading && tasks.length > 0) {
      const sorted = [...tasks].sort((a, b) =>
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )

      // Only update if order actually changed
      const isSameOrder = tasks.every((task, idx) => task.id === sorted[idx]?.id)
      if (!isSameOrder) {
        setTasks(sorted)
      }
    }
  }, [loading]) 

  // useEffect 3: Browser title update - SSR SAFE
  useEffect(() => {
    if (typeof window === 'undefined') return

    const pendingCount = tasks.filter(t => t.status === 'Pending').length
    document.title = pendingCount > 0
     ? `(${pendingCount}) Pending Tasks - TaskFlow`
      : 'TaskFlow - Dashboard'
  }, [tasks])

  const addTask = (taskData: TaskFormData) => {
    const newTask: Task = {
     ...taskData,
      id: crypto.randomUUID(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    }
    setTasks(prev => [newTask,...prev])
    toast.success('Task added successfully!')
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id!== id))
    toast.error('Task deleted')
  }

  const updateTask = (id: string, updatedData: Partial<Task>) => {
    setTasks(prev => prev.map(task =>
      task.id === id? {...task,...updatedData } : task
    ))
    toast.success('Task updated!')
  }

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id
       ? {...task, status: task.status === 'Completed'? 'Pending' : 'Completed' }
        : task
    ))
    toast.success('Status updated!')
  }

  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id)
  }

  return (
    <TaskContext.Provider value={{ tasks, setTasks, loading, addTask, deleteTask, updateTask, toggleTaskStatus, getTaskById }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTasks must be used within TaskProvider')
  return context
}