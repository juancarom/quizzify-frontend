import { api } from './api';

export interface User {
  id: number;
  email: string;
  name: string;
  avatar_url?: string;
  role: string;
  created_at: string;
}

export interface AuthResponse {
  status: {
    code: number;
    message: string;
  };
  data: User;
}

export interface SignUpData {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Helper function to set cookie
function setCookie(name: string, value: string, days: number = 1) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;samesite=lax`;
}

// Helper function to delete cookie
function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await api.post('/signup', { user: data });
    if (response.headers.authorization) {
      const token = response.headers.authorization.split(' ')[1];
      localStorage.setItem('token', token);
      setCookie('token', token, 1);
    }
    return response.data;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/login', { user: data });
    if (response.headers.authorization) {
      const token = response.headers.authorization.split(' ')[1];
      localStorage.setItem('token', token);
      setCookie('token', token, 1);
    }
    return response.data;
  },

  async logout(): Promise<void> {
    await api.delete('/logout');
    localStorage.removeItem('token');
    deleteCookie('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
