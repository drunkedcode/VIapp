import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "@/Layouts/AuthLayout";
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

import Login from "@/Pages/auth/Login";
import Register from "@/Pages/auth/Register";
import Recover from "@/Pages/auth/Recover";

export const router = createBrowserRouter([
  { path: "/", element: <ViSplash /> },
  { path: "/business/create/welcome", element: <WelcomeBusiness /> },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/recover", element: <Recover /> },
    ],
  },
  {
    element: <ViLayout />,
    children: [
      { path: "/feed", element: <Feed /> },
      { path: "/directory", element: <Directory /> },
      { path: "/camera", element: <Camera /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/oportunity", element: <Profile /> },
      { path: "/business/create", element: <BusinessCreate /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
