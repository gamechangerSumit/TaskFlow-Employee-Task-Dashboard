import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddTask from './pages/AddTask'
import EditTask from './pages/EditTask'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add" element={<AddTask />} />
      <Route path="/edit/:id" element={<EditTask />} />
    </Routes>
  )
}

export default App