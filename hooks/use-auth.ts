'use client';

import { useMutation } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { authService } from '@/lib/auth';
import { useAuthStore } from '@/lib/store';

export function useLogin() {
  const locale = useLocale();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      console.log('Login successful:', response);
      setUser(response.data);
      const token = authService.getToken();
      if (token) {
        setToken(token);
        console.log('Token set, redirecting to dashboard');
        // Small delay to ensure cookie is set
        setTimeout(() => {
          window.location.href = `/${locale}/dashboard`;
        }, 100);
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
}

export function useSignup() {
  const locale = useLocale();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: (response) => {
      console.log('Signup successful:', response);
      setUser(response.data);
      const token = authService.getToken();
      if (token) {
        setToken(token);
        console.log('Token set, redirecting to dashboard');
        // Small delay to ensure cookie is set
        setTimeout(() => {
          window.location.href = `/${locale}/dashboard`;
        }, 100);
      }
    },
    onError: (error) => {
      console.error('Signup error:', error);
    },
  });
}

export function useLogout() {
  const locale = useLocale();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      // Small delay to ensure cookie is cleared
      setTimeout(() => {
        window.location.href = `/${locale}/`;
      }, 100);
    },
    onError: () => {
      // Logout locally even if API fails
      logout();
      setTimeout(() => {
        window.location.href = `/${locale}/`;
      }, 100);
    },
  });
}
