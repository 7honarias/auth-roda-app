import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { LoginUseCase } from '../../application/use_cases/LoginUseCase.js';
import { RegisterUseCase } from '../../application/use_cases/RegisterUseCase.js';
import { RefreshTokenUseCase } from '../../application/use_cases/RefreshTokenUseCase.js';
import { VerifyTokenUseCase } from '../../application/use_cases/VerifyTokenUseCase.js';
import { AuthRepositoryImpl } from '../../infrastructure/repositories/AuthRepositoryImpl.js';
import toast from 'react-hot-toast';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  const authRepository = new AuthRepositoryImpl();
  const loginUseCase = new LoginUseCase(authRepository);
  const registerUseCase = new RegisterUseCase(authRepository);
  const refreshTokenUseCase = new RefreshTokenUseCase(authRepository);
  const verifyTokenUseCase = new VerifyTokenUseCase(authRepository);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const result = await verifyTokenUseCase.execute();
      
      if (result.success && result.data.isValid) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user: result.data.user },
        });
      } else {
        const refreshResult = await refreshTokenUseCase.execute();
        if (refreshResult.success) {
          const verifyResult = await verifyTokenUseCase.execute();
          if (verifyResult.success && verifyResult.data.isValid) {
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: { user: verifyResult.data.user },
            });
          } else {
            dispatch({ type: 'AUTH_LOGOUT' });
          }
        } else {
          dispatch({ type: 'AUTH_LOGOUT' });
        }
      }
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
    }
  };

  const login = async (cedula, password) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const result = await loginUseCase.execute(cedula, password);
      
      if (result.success) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user: result.data.user },
        });
        toast.success('¡Bienvenido!');
        return { success: true };
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: result.error });
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Error al iniciar sesión';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (cedula, password, firstName, lastName, phone, address) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const result = await registerUseCase.execute(cedula, password, firstName, lastName, phone, address);
      
      if (result.success) {
        toast.success('¡Usuario registrado exitosamente! Por favor inicia sesión.');
        return { success: true };
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: result.error });
        toast.error(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = 'Error al registrar usuario';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    authRepository.clearTokens();
    dispatch({ type: 'AUTH_LOGOUT' });
    toast.success('Sesión cerrada exitosamente');
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};