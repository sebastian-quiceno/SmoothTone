import {createContext} from 'react'
import { type AuthResponseDTO } from '../types/auth'
interface AuthContextType {
  auth: AuthResponseDTO | null;

  token: string | null;
  userId: number | null;
  userName: string | null;
  uploadedSongs: number;

  isAuthenticated: boolean;

  login: (data: AuthResponseDTO) => void;

  logout: () => void;

  updateUploadedSongs: (count: number) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);