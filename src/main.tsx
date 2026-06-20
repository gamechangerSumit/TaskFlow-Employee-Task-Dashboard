import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { TaskProvider } from './context/TaskContext.tsx'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <Toaster position="top-right" />
        <App />
      </TaskProvider>
    </BrowserRouter>
  </React.StrictMode>,
)