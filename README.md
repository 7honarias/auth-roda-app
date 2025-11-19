# Auth Microfrontend

Un microfrontend de autenticación construido con React, Vite y Clean Architecture, listo para integrarse vía Module Federation.

## 🚀 Características

- **Arquitectura Limpia (Clean Architecture)**: Separación clara de responsabilidades en capas
- **Module Federation**: Compatible con microfrontends usando Vite
- **React 18**: Última versión de React con hooks modernos
- **Validación de Formularios**: Usando React Hook Form + Zod
- **Autenticación JWT**: Manejo completo de tokens y refresh automático
- **Diseño Responsivo**: Interfaz adaptable a diferentes dispositivos
- **API Integration**: Conexión con API REST existente

## 📁 Estructura del Proyecto

```
auth-mf/
├── src/
│   ├── domain/              # Capa de Dominio
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── AuthDtos.js
│   │   │   └── ValidationRules.js
│   ├── application/         # Capa de Aplicación
│   │   ├── use_cases/
│   │   │   ├── LoginUseCase.js
│   │   │   ├── RegisterUseCase.js
│   │   │   ├── RefreshTokenUseCase.js
│   │   │   └── VerifyTokenUseCase.js
│   │   └── repositories/
│   │       └── AuthRepository.js
│   ├── infrastructure/      # Capa de Infraestructura
│   │   └── repositories/
│   │       └── AuthRepositoryImpl.js
│   ├── presentation/        # Capa de Presentación
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── index.html
│   └── package.json
```

## 🏗️ Arquitectura

### Dominio (Domain)
- **Modelos**: `User.js`, `AuthDtos.js`
- **Validaciones**: `ValidationRules.js`
- **Lógica de negocio**: Reglas de validación y entidades

### Aplicación (Application)
- **Casos de Uso**: Login, Register, RefreshToken, VerifyToken
- **Repositorios**: Interfaces para la persistencia
- **Coordinación**: Lógica de aplicación independiente de frameworks

### Infraestructura (Infrastructure)
- **Implementación**: `AuthRepositoryImpl.js`
- **API Integration**: Cliente HTTP con axios
- **Storage**: Manejo de tokens en localStorage
- **Interceptors**: Refresh automático de tokens

### Presentación (Presentation)
- **React Context**: Estado global de autenticación
- **Componentes**: Formularios de login y registro
- **Hooks**: Lógica reutilizable
- **Estilos**: CSS con diseño moderno

## 🔧 Instalación y Uso

### ⚡ Instalación Rápida

1. **Limpiar instalación previa** (si existe):
```bash
rm -rf node_modules package-lock.json pnpm-lock.yaml
```

2. **Instalar dependencias**:
```bash
npm install
# o alternativamente:
yarn install
# o:
pnpm install
```

3. **Ejecutar en modo desarrollo**:
```bash
npm run dev
```

4. **Construir para producción**:
```bash
npm run build
```

### 🔧 Solución de Problemas

#### Error de @import en CSS
✅ **SOLUCIONADO**: El archivo `index.css` ya tiene el @import de Google Fonts en la posición correcta.

#### Error de compatibilidad Zod/React Hook Form
✅ **SOLUCIONADO**: El proyecto usa validación manual con Zod sin @hookform/resolvers para máxima compatibilidad.

#### Problemas con gestores de paquetes
Si experimentas problemas con npm, prueba:
```bash
# Usar Yarn
yarn install && yarn dev

# Usar pnpm
pnpm install && pnpm dev

# Limpiar caché npm
npm cache clean --force
npm install
```

### 🔌 Configuración de la API

#### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_TOKEN_KEY=auth_token
VITE_REFRESH_TOKEN_KEY=refresh_token
VITE_MF_NAME=auth
VITE_MF_PORT=3001
```

#### Configuración Manual
Si prefieres configurar directamente, edita `src/infrastructure/repositories/AuthRepositoryImpl.js`:

```javascript
const authRepository = new AuthRepositoryImpl('http://tu-api-url.com/api');
```

#### Formato de Respuesta de API
Tu API debe retornar responses en este formato:

**Login/Register Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "cedula": "cedula",
      "firstName": "Juan",
      "lastName": "Pérez"
    },
    "tokens": {
      "accessToken": "jwt_token",
      "refreshToken": "refresh_token"
    }
  }
}
```

### Endpoints Esperados

El microfrontend espera los siguientes endpoints en tu API:

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario
- `POST /auth/refresh-token` - Refrescar token
- `GET /auth/verify-token` - Verificar token

#### Ejemplo de Responses de API

**Login Response:**
```json
{
  "accessToken": "jwt_access_token",
  "refreshToken": "jwt_refresh_token",
  "expiresIn": 3600,
  "user": {
    "id": "user_id",
    "cedula": "cedula",
    "firstName": "Juan",
    "lastName": "Pérez",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  }
}
```

**Register Response:**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "user_id",
    "cedula": "18293",
    "firstName": "Juan",
    "lastName": "Pérez",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  }
}
```

**Refresh Token Response:**
```json
{
  "accessToken": "new_jwt_access_token",
  "refreshToken": "new_jwt_refresh_token",
  "expiresIn": 3600
}
```

**Verify Token Response:**
```json
{
  "isValid": true,
  "user": {
    "id": "user_id",
    "cedula": "user@example.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-01T00:00:00Z"
  }
}
```

## 🧩 Integración con Module Federation

### Como Host (Aplicación Principal)

Para usar este microfrontend desde una aplicación principal:

1. **Instalar Module Federation Plugin**:
```bash
npm install @originjs/vite-plugin-federation
```

2. **Configurar Module Federation en tu aplicación principal**:

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        auth: 'http://localhost:3001/assets/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: false },
        'react-dom': { singleton: true, eager: false },
        'react-router-dom': { singleton: true, eager: false },
      },
    })
  ],
})
```

3. **Usar el microfrontend en tu aplicación**:

```jsx
import React from 'react';
import { App as AuthApp } from 'auth/App';

const HomePage = () => {
  return (
    <div>
      <h1>Mi Aplicación</h1>
      <AuthApp />
    </div>
  );
};

export default HomePage;
```

### Como Remote (Este Microfrontend)

El microfrontend ya está configurado como remote y expone el componente `App`:

- **URL**: `http://localhost:3001/assets/remoteEntry.js`
- **Expose**: `auth/App`
- **Nombre**: `auth`

## 🔐 Características de Seguridad

- **Validación Frontend**: Validación completa de formularios antes del envío
- **JWT Storage**: Tokens almacenados en localStorage
- **Token Refresh**: Refresh automático de tokens vencidos
- **Error Handling**: Manejo robusto de errores de autenticación
- **Input Sanitization**: Sanitización de inputs de usuario

## 🎨 Personalización

### Estilos

Los estilos están definidos en `src/presentation/index.css` usando Tailwind CSS classes y CSS personalizado. Puedes personalizar:

- Colores del tema
- Tipografía
- Espaciado
- Animaciones

### Componentes

Los componentes principales están en:
- `LoginForm.jsx` - Formulario de login
- `RegisterForm.jsx` - Formulario de registro
- `AuthContext.jsx` - Estado global de autenticación

## 🧪 Testing

Para implementar tests, puedes usar:

- **Jest** para tests unitarios
- **React Testing Library** para tests de componentes
- **Cypress** para tests E2E

## 📝 Notas Importantes

1. **Dependencies Compartidas**: React y React DOM están configurados como singletons para evitar duplicación de código.

2. **Environment Variables**: Para producción, asegúrate de configurar correctamente las variables de entorno para la URL de la API.

3. **CORS**: Asegúrate de que tu API esté configurada para permitir requests desde el dominio donde se alojará el microfrontend.

4. **HTTPS**: En producción, asegúrate de usar HTTPS para la API y el hosting del microfrontend.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**Desarrollado con ❤️ usando React, Vite y Clean Architecture**