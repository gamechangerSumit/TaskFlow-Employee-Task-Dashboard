import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useTasks } from '../context/TaskContext'
import { TaskFormData } from '../types'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import { ClipboardList, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function EditTask() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { getTaskById, updateTask, deleteTask } = useTasks()
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: ''
  })

  useEffect(() => {
    if (id) {
      const task = getTaskById(id)
      if (task) {
        setFormData({
          title: task.title,
          description: task.description,
          priority: task.priority,
          dueDate: task.dueDate
        })
      } else {
        toast.error('Task not found')
        navigate('/')
      }
    }
  }, [id, getTaskById, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      toast.error('Title daal bhai')
      return
    }
    if (id) {
      updateTask(id, formData)
      navigate('/')
    }
  }

  const handleDelete = () => {
    if (id) {
      toast((t) => (
        <div className="flex flex-col gap-3">
          <span className="font-medium">Task delete karna hai?</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                deleteTask(id)
                toast.dismiss(t.id)
                navigate('/')
              }}
              className="bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1.5 rounded text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ), { duration: 5000 })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      {/* Mobile: ml-0, Desktop: ml-64 */}
      <div className="lg:ml-64">
        <Header />
        <main className="p-4 md:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Edit Task</h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">Update task details and make changes.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Form Section */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Task Title *
                        </label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base text-gray-900 dark:text-white"
                          placeholder="Enter task title"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Due Date
                        </label>
                        <input
                          type="date"
                          value={formData.dueDate}
                          onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                          className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Priority
                        </label>
                        <select
                          value={formData.priority}
                          onChange={(e) => setFormData({...formData, priority: e.target.value as TaskFormData['priority']})}
                          className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base text-gray-900 dark:text-white"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={4}
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none text-sm md:text-base text-gray-900 dark:text-white resize-none"
                        placeholder="Enter task description..."
                      />
                    </div>

                    {/* Buttons - Stack on mobile */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2 md:pt-4">
                      <button
                        type="submit"
                        className="flex-1 sm:flex-initial bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-6 py-2.5 md:py-3 rounded-lg font-medium text-sm md:text-base transition-all"
                      >
                        Update Task
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-6 py-2.5 md:py-3 rounded-lg font-medium hover:bg-red-100 dark:hover:bg-red-950/50 active:scale-95 text-sm md:text-base transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Task
                      </button>
                      <Link
                        to="/"
                        className="flex-1 sm:flex-initial bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-2.5 md:py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 text-sm md:text-base text-center transition-all"
                      >
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
              </div>

              {/* Illustration Section - Top on mobile */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-xl p-6 md:p-8 flex flex-col items-center justify-center h-auto lg:h-full">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center mb-3 md:mb-4 shadow-lg">
                    <ClipboardList className="w-12 h-12 md:w-16 md:h-16 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 text-center">
                    Keep your tasks up to date
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}