import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { validateRegisterForm } from '../../domain/models/ValidationRules.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export const RegisterForm = ({ onSwitchToLogin }) => {
  const { register: registerUser, isLoading } = useAuth();
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
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
    },
  });

  const validateForm = (data) => {
    const validationResult = validateRegisterForm(data);
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
    
    const result = await registerUser(data.cedula, 
      data.password, data.firstName, data.lastName, data.phone, data.address);
    if (result.success) {
      reset();
      setErrors({});
      onSwitchToLogin();
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
          <h1 className="auth-title">Crear Cuenta</h1>
          <p className="auth-subtitle">
            Regístrate para crear tu nueva cuenta
          </p>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              Nombre
            </label>
            <div className="input-wrapper">
              <div className="input-icon">👤</div>
              <input
                {...register('firstName')}
                type="text"
                autoComplete="given-name"
                className={`form-input with-icon ${errors.firstName ? 'error' : ''}`}
                placeholder="Tu nombre"
              />
            </div>
            {errors.firstName && (
              <p className="form-error">{errors.firstName.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Apellido
            </label>
            <div className="input-wrapper">
              <div className="input-icon">👤</div>
              <input
                {...register('lastName')}
                type="text"
                autoComplete="family-name"
                className={`form-input with-icon ${errors.lastName ? 'error' : ''}`}
                placeholder="Tu apellido"
              />
            </div>
            {errors.lastName && (
              <p className="form-error">{errors.lastName.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="cedula" className="form-label">
              Documento de Identidad
            </label>
            <div className="input-wrapper">
              <div className="input-icon">📧</div>
              <input
                {...register('cedula')}
                type="number"
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
            <label htmlFor="address" className="form-label">
              Dirección
            </label>
            <div className="input-wrapper">
              <div className="input-icon">📧</div>
              <input
                {...register('address')}
                type="text"
                autoComplete="address"
                className={`form-input with-icon ${errors.address ? 'error' : ''}`}
                placeholder="Dirección"
              />
            </div>
            {errors.address && (
              <p className="form-error">{errors.address.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Telefono
            </label>
            <div className="input-wrapper">     
              <div className="input-icon">📧</div>
              <input
                {...register('phone')}
                type="number"
                autoComplete="phone"
                className={`form-input with-icon ${errors.phone ? 'error' : ''}`}
                placeholder="Telefono"
              />
            </div>
            {errors.phone && (
              <p className="form-error">{errors.phone.message}</p>
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
                autoComplete="new-password"
                className={`form-input with-icon ${errors.password ? 'error' : ''}`}
                placeholder="Contraseña segura"
              />
            </div>
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Contraseña
            </label>
            <div className="input-wrapper">
              <div className="input-icon">🔒</div>
              <input
                {...register('confirmPassword')}
                type="password"
                autoComplete="new-password"
                className={`form-input with-icon ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirma tu contraseña"
              />
            </div>
            {errors.confirmPassword && (
              <p className="form-error">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn btn-primary btn-block ${isSubmitting ? 'btn-loading' : ''}`}
          >
            {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>

          <div className="auth-switch">
            <p className="auth-switch-text">
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="auth-switch-link"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
