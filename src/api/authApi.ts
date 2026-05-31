import { apiClient } from './apiClient'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  name: string
  email: string
  role?: string
}

export const loginRequest = async (data: LoginRequest) => {
  const response = await apiClient.post<AuthResponse>('/auth/login', data)
  return response.data
}

export const registerRequest = async (data: RegisterRequest) => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data)
  return response.data
}
