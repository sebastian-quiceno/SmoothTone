import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SingInPage from './pages/SingInPage.tsx'
import SingUpPage from './pages/SingUpPage.tsx'
import Home from './pages/Home.tsx'
import UserHome from './pages/Music.tsx'
import GenreForm from './pages/GenreForm.tsx'
import ArtistForm from './pages/ArtistForm.tsx'
import SongForm from './pages/SongForm.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'

import { AuthProvider } from './contexts/AuthContext.tsx'

import './index.css'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SingInPage />,
  },
  {
    path: "/signup",
    element: <SingUpPage />,
  },
  {
    path: "/userhome",
    element: <ProtectedRoute><UserHome /></ProtectedRoute>,
  },
  {
    path: "/creategenre",
    element: <ProtectedRoute><GenreForm /></ProtectedRoute>,
  },
  {
    path: "/createartist",
    element: <ProtectedRoute><ArtistForm /></ProtectedRoute>,
  },
  {
    path: "/upload-song",
    element: <ProtectedRoute><SongForm /></ProtectedRoute>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)