import { createBrowserRouter, Navigate } from 'react-router-dom'

import AuthLayout from '../layouts/AuthLayout'
import ViLayout from '../layouts/ViLayout'

import ViSplash from '../Pages/vi/Splash'
import Feed from '../Pages/vi/Feed'
import Directory from '../Pages/vi/Directory'
import Camera from '../Pages/vi/Camera'
import Favorites from '../Pages/vi/Favorites'
import Profile from '../Pages/vi/Profile'

import Login from '../Pages/auth/Login'
import Register from '../Pages/auth/Register'
import Recover from '../Pages/auth/Recover'


export const router = createBrowserRouter([
  { path: '/', element: <ViSplash /> },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/recover', element: <Recover /> },
    ],
  },
  {
    element: <ViLayout />,
    children: [
      { path: '/feed', element: <Feed /> },
      { path: '/directory', element: <Directory /> },
      { path: '/camera', element: <Camera /> },
      { path: '/favorites', element: <Favorites /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])