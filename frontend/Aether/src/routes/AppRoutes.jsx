import { Routes, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Tasks from '../pages/Tasks'
import Meetings from '../pages/Meetings'
import Login from '../pages/Login'
import Register from '../pages/Register'
import TeamChat from '../pages/TeamChat'
import AdminDashboard from '../pages/AdminDashboard'
import AIAssistantPage from '../pages/AIAssistantPage'

import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'
import Home from '../pages/Home'


function AppRoutes() {

  return (
    <Routes>

      <Route path='/login' element={<Login />} />

      <Route path='/register' element={<Register />} />

      <Route path='/' element={<Home />} />
      <Route
  path='/dashboard'
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
 
      <Route
        path='/tasks'
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />

      <Route
        path='/meetings'
        element={
          <ProtectedRoute>
            <Meetings />
          </ProtectedRoute>
        }
      />

      <Route
        path='/chat'
        element={
          <ProtectedRoute>
            <TeamChat />
          </ProtectedRoute>
        }
      />

      <Route
        path='/ai-assistant'
        element={
          <ProtectedRoute>
            <AIAssistantPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/admin'
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

    </Routes>
  )
}

export default AppRoutes