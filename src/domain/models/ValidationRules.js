import { z } from 'zod';

export const cedulaSchema = z.string()
  .min(1, 'El cedula es requerido')
  .max(10, 'El cedula no puede exceder 10 caracteres');

export const passwordSchema = z.string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(128, 'La contraseña no puede exceder 128 caracteres')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos una minúscula, una mayúscula y un número');

export const firstNameSchema = z.string()
  .min(1, 'El nombre es requerido')
  .max(50, 'El nombre no puede exceder 50 caracteres')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios');

export const lastNameSchema = z.string()
  .min(1, 'El apellido es requerido')
  .max(50, 'El apellido no puede exceder 50 caracteres')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras y espacios');

export const loginFormSchema = z.object({
  cedula: cedulaSchema,
  password: z.string().min(1, 'La contraseña es requerida'),
});

export const registerFormSchema = z.object({
  cedula: cedulaSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  firstName: firstNameSchema,
  lastName: lastNameSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export const validateCedula = (cedula) => {
  try {
    cedulaSchema.parse(cedula);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, errors: error.errors.map(e => e.message) };
    }
    return { isValid: false, errors: ['Error de validación'] };
  }
};

export const validatePassword = (password) => {
  try {
    passwordSchema.parse(password);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, errors: error.errors.map(e => e.message) };
    }
    return { isValid: false, errors: ['Error de validación'] };
  }
};

export const validateLoginForm = (data) => {
  try {
    loginFormSchema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = {};
      error.errors.forEach(e => {
        const field = e.path[0];
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(e.message);
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: ['Error de validación'] } };
  }
};

export const validateRegisterForm = (data) => {
  try {
    registerFormSchema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = {};
      error.errors.forEach(e => {
        const field = e.path[0];
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(e.message);
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: ['Error de validación'] } };
  }
};