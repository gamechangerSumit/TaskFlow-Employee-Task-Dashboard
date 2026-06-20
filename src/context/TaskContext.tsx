import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
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

  // useEffect 1: JSONPlaceholder API For initial tasks loading
  useEffect(() => {
    const fetchTasks = async () => {
      const saved = localStorage.getItem('employee-tasks')
      if (saved && JSON.parse(saved).length > 0) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
        const data = await res.json()

        const apiTasks: Task[] = data.map((item: any) => ({
          id: crypto.randomUUID(),
          title: item.title,
          description: 'Fetched from JSONPlaceholder API',
          priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as any,
          status: item.completed? 'Completed' : 'Pending',
          dueDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          createdAt: new Date().toISOString()
        }))

        setTasks(apiTasks)
        toast.success('5 tasks loaded from API!')
      } catch (error) {
        toast.error('Failed to load API tasks')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  // useEffect 2: Auto-sort tasks by dueDate
  useEffect(() => {
    if (!loading) {
      setTasks(prev =>
        [...prev].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      )
    }
  }, [loading])

  // useEffect 3: Browser tab title update
  useEffect(() => {
    const pendingCount = tasks.filter(t => t.status === 'Pending').length
    document.title = pendingCount > 0
    ? `(${pendingCount}) Pending Tasks - Dashboard`
      : 'Employee Task Dashboard'
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