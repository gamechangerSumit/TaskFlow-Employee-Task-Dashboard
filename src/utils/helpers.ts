export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High': return 'red'
    case 'Medium': return 'orange'
    case 'Low': return 'blue'
    default: return 'gray'
  }
}

export const isOverdue = (dueDate: string) => {
  return new Date(dueDate) < new Date() && new Date(dueDate).toDateString()!== new Date().toDateString()
}