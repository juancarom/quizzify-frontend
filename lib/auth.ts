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

export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await api.post('/signup', { user: data });
    if (response.headers.authorization) {
      const token = response.headers.authorization.split(' ')[1];
      localStorage.setItem('token', token);
    }
    return response.data;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/login', { user: data });
    if (response.headers.authorization) {
      const token = response.headers.authorization.split(' ')[1];
      localStorage.setItem('token', token);
    }
    return response.data;
  },

  async logout(): Promise<void> {
    await api.delete('/logout');
    localStorage.removeItem('token');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
