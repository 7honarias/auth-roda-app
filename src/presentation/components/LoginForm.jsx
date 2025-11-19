import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validateLoginForm } from '../../domain/models/ValidationRules.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export const LoginForm = ({ onSwitchToRegister,  onLoginSuccess }) => {
  const { login, isLoading } = useAuth();
  const [errors, setErrors] = useState({});
  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      cedula: '',
      password: '',
    },
  });

  const validateForm = (data) => {
    const validationResult = validateLoginForm(data);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return false;
    }
    setErrors({});
    return true;
  };

  const onSubmit = async (data) => {
    if (!validateForm(data)) {
      return;
    }
    
    const result = await login(data.cedula, data.password);
    if (result.success) {
      onLoginSuccess();
      reset();
      setErrors({});
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo"></div>
          <h1 className="auth-title">Bienvenido de vuelta</h1>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="cedula" className="form-label">
              Cedula
            </label>
            <div className="input-wrapper">
              <div className="input-icon">📧</div>
              <input
                {...register('cedula')}
                type="cedula"
                autoComplete="cedula"
                className={`form-input with-icon ${errors.cedula ? 'error' : ''}`}
                placeholder="documento de identidad"
              />
            </div>
            {errors.cedula && (
              <p className="form-error">{errors.cedula.message}</p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <div className="input-wrapper">
              <div className="input-icon">🔒</div>
              <input
                {...register('password')}
                type="password"
                autoComplete="current-password"
                className={`form-input with-icon ${errors.password ? 'error' : ''}`}
                placeholder="Tu contraseña segura"
              />
            </div>
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn btn-primary btn-block ${isSubmitting ? 'btn-loading' : ''}`}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          <div className="auth-switch">
            <p className="auth-switch-text">
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="auth-switch-link"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
