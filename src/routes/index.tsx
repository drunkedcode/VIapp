import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/Shared/store/useAuthStore";

import AuthLayout from "@/Pages/auth/AuthLayout";
import ViLayout from "@/Layouts/ViLayout";

import ViSplash from "@/Pages/vi/Splash/Splash";
import Feed from "@/Pages/vi/Feed/Feed";
import Directory from "@/Pages/vi/Directory/Directory";
import Camera from "@/Pages/vi/Camera/Camera";
import Favorites from "@/Pages/vi/Favorites/Favorites";
import Profile from "@/Pages/vi/Profile/Profile";
import Opportunities from "@/Pages/vi/Opportunities/Opportunities";
import WelcomeBusiness from "@/Pages/Business/Create/WelcomeBusiness";
import BusinessCreate from "@/Pages/Business/Create/Create";

import Login from "@/Pages/auth/partials/Login";
import Register from "@/Pages/auth/partials/Register";
import Recover from "@/Pages/auth/partials/Recover";

import TermsOfUse from "@/Pages/legal/TermsOfUse"
import PrivacyPolicy from "@/Pages/legal/PrivacyPolicy"

// --- GUARDS DE PROTECCIÓN ---

/** Protege rutas que exigen estar logueado (Mundo Morador / Negocio) */
function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  // Si no está autenticado, lo redirige al login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

/** Protege rutas públicas (Login, Register) para que un usuario ya logueado no entre */
function GuestRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Si ya está logueado, se bloquea y se bota al feed de inmediato
  if (isAuthenticated) {
    return <Navigate to="/feed" replace />;
  }
  return <Outlet />;
}

// --- CONFIGURACIÓN DE RUTAS ---

export const router = createBrowserRouter([
  { path: "/splash", element: <ViSplash /> },
  { path: "/", element: <Navigate to="/splash" replace /> },


  // Rutas exclusivas para invitados (No logueados)
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
          { path: "/recover", element: <Recover /> },
        ]
      },
      { path:"/terms", element:<TermsOfUse />},
      { path:"/privacy", element:<PrivacyPolicy />} 
     
    ],
      
  },

  // Rutas protegidas (Exigen sesión activa)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ViLayout />,
        children: [
          { path: "/feed", element: <Feed /> },
          { path: "/directory", element: <Directory /> },
          { path: "/camera", element: <Camera /> },
          { path: "/favorites", element: <Favorites /> },
          { path: "/profile", element: <Profile /> },
          { path: "/oportunity", element: <Opportunities /> },
          { path: "/business/create", element: <BusinessCreate /> },
        ],
      },
      { path: "/business/create/welcome", element: <WelcomeBusiness /> },

    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
]);
