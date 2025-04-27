import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import App from './App'
import './index.css'
import { routes } from './routes'
import { TaskProvider } from './context/taskContext'

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <TaskProvider>
      <RouterProvider router={router}/>
  </TaskProvider>
    
)