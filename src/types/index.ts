export interface Task {
  id: string
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'Pending' | 'Completed'
  dueDate: string
  createdAt: string
}

export interface TaskFormData {
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  dueDate: string
}