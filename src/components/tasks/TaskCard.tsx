import { Link } from 'react-router-dom'
import { Task } from '../../types'
import { useTasks } from '../../context/TaskContext'
import {
  CheckCircle2,
  Undo2,
  Pencil,
  Trash2,
  Calendar,
  Folder,
  Clock,
  AlertCircle,
  MoreVertical,
  User
} from 'lucide-react'

export default function TaskCard({ task }: { task: Task }) {
  const { deleteTask, toggleTaskStatus } = useTasks()

  // Line 1: User ka naam localStorage se le
  const currentUserName = localStorage.getItem('userName') || localStorage.getItem('name') || 'User'

  const priorityConfig = {
    Low: {
      badge: 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400',
      dot: 'bg-green-500',
      border: 'border-l-green-500'
    },
    Medium: {
      badge: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400',
      dot: 'bg-amber-500',
      border: 'border-l-amber-500'
    },
    High: {
      badge: 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400',
      dot: 'bg-red-500',
      border: 'border-l-red-500'
    }
  }

  const statusConfig = {
    Pending: {
      badge: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400',
      icon: Clock,
      text: 'Pending'
    },
    'In Progress': {
      badge: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400',
      icon: Clock,
      text: 'In Progress'
    },
    Completed: {
      badge: 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400',
      icon: CheckCircle2,
      text: 'Completed'
    },
    Overdue: {
      badge: 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400',
      icon: AlertCircle,
      text: 'Overdue'
    }
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status === 'Pending'
  const currentStatus = isOverdue? 'Overdue' : task.status
  const priority = priorityConfig[task.priority]
  const status = statusConfig[currentStatus]
  const StatusIcon = status.icon

  const handleComplete = () => {
    toggleTaskStatus(task.id)
  }

  const handleDelete = () => {
    deleteTask(task.id)
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 border-l-4 ${priority.border} shadow-sm hover:shadow-md transition-all`}>
      <div className="p-5">
        {/* Top: Priority Badge + Menu */}
        <div className="flex items-start justify-between mb-3">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${priority.badge}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}></div>
            <span>{task.priority}</span>
          </div>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2.5">
          {task.title}
        </h3>

        {/* Project & Due Date */}
        <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1.5">
            <Folder className="w-3.5 h-3.5" />
            <span>{task.category || 'General'}</span>
          </div>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3.5 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Status Badge */}
        <div className="mb-4">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${status.badge}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            <span>{status.text}</span>
          </div>
        </div>

        {/* Footer: Assignee + Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          {/* Assignee */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Assigned to</p>
              <p className="text-xs font-medium text-gray-900 dark:text-white">
                {task.assignedTo || currentUserName}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleComplete}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-950/30 text-green-600 dark:text-green-400 transition-colors"
              title={task.status === 'Completed'? 'Undo' : 'Complete'}
            >
              {task.status === 'Completed'? (
                <Undo2 className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
            </button>
            <Link
              to={`/edit/${task.id}`}
              onPointerDown={(e) => e.stopPropagation()}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-blue-600 dark:text-blue-400 transition-colors"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </Link>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleDelete}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}