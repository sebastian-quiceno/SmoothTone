import { useEffect, useState, type ReactNode } from "react";

import type { AuthResponseDTO } from "../types/auth";

import {AuthContext} from './authContext'



interface Props {
  children: ReactNode;
}

const STORAGE_KEY = "auth";

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<AuthResponseDTO | null>(null);

  // Restaurar sesión
  useEffect(() => {
    const storedAuth = localStorage.getItem(STORAGE_KEY);

    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  // Login
  const login = (data: AuthResponseDTO) => {
    setAuth(data);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // Logout
  const logout = () => {
    setAuth(null);

    localStorage.removeItem(STORAGE_KEY);
  };

  // Actualizar uploadedSongs
  const updateUploadedSongs = (count: number) => {
    if (!auth) return;

    const updatedAuth = {
      ...auth,
      uploadedSongs: count,
    };

    setAuth(updatedAuth);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAuth));
  };

  return (
    <AuthContext.Provider
      value={{
        auth,

        token: auth?.token || null,
        userId: auth?.userId || null,
        userName: auth?.userName || null,
        uploadedSongs: auth?.uploadedSongs || 0,

        isAuthenticated: !!auth?.token,

        login,
        logout,

        updateUploadedSongs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
