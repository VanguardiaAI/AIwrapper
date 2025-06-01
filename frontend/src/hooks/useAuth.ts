import { useState, useEffect, useCallback } from 'react';
import { authService, User, AuthResponse } from '@/lib/auth';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  sendMessage: (message: string) => Promise<any>;
  getChatHistory: (limit?: number) => Promise<any[]>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticación al cargar
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const authenticated = await authService.isAuthenticated();
      
      if (authenticated) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Inicializar autenticación
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Escuchar eventos de autenticación
  useEffect(() => {
    const handleLogin = (event: CustomEvent) => {
      const authData: AuthResponse = event.detail;
      setUser(authData.user);
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    const handleLogout = () => {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    };

    const handleError = (event: CustomEvent) => {
      console.error('Error de autenticación:', event.detail);
      setIsLoading(false);
    };

    window.addEventListener('auth:login', handleLogin as EventListener);
    window.addEventListener('auth:logout', handleLogout);
    window.addEventListener('auth:error', handleError as EventListener);

    return () => {
      window.removeEventListener('auth:login', handleLogin as EventListener);
      window.removeEventListener('auth:logout', handleLogout);
      window.removeEventListener('auth:error', handleError as EventListener);
    };
  }, []);

  // Función para iniciar sesión
  const signIn = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.signInWithGoogle();
      // El estado se actualizará automáticamente por el evento 'auth:login'
    } catch (error) {
      console.error('Error en login:', error);
      setIsLoading(false);
      throw error;
    }
  }, []);

  // Función para cerrar sesión
  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.signOut();
      // El estado se actualizará automáticamente por el evento 'auth:logout'
    } catch (error) {
      console.error('Error en logout:', error);
      setIsLoading(false);
      throw error;
    }
  }, []);

  // Función para enviar mensaje al chatbot
  const sendMessage = useCallback(async (message: string) => {
    if (!isAuthenticated) {
      throw new Error('Usuario no autenticado');
    }
    return authService.sendMessage(message);
  }, [isAuthenticated]);

  // Función para obtener historial de chat
  const getChatHistory = useCallback(async (limit: number = 50) => {
    if (!isAuthenticated) {
      return [];
    }
    return authService.getChatHistory(limit);
  }, [isAuthenticated]);

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
    sendMessage,
    getChatHistory,
  };
} 