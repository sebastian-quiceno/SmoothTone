import axios from "axios";
import apiClient from "../apis/apiClient";
import { type AuthResponseDTO } from "../types/auth";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  username: string;
  password: string;
}

function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || fallbackMessage;
  }

  return fallbackMessage;
}

export async function signIn(request: SignInRequest): Promise<AuthResponseDTO> {
  try {
    const response = await apiClient.post<AuthResponseDTO>("/auth/signin", request);
    return response.data;

  } catch (error: unknown) {
    throw new Error(getApiErrorMessage(error, "Credenciales inválidas"));
  }
}

export async function signUp(request: SignUpRequest): Promise<AuthResponseDTO> {
  try {
    const response = await apiClient.post<AuthResponseDTO>("/auth/signup", request);

    return response.data;


  } catch (error: unknown) {
    throw new Error(getApiErrorMessage(error, "Error al registrarse"));
  }
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}