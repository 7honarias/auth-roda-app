# Auth Microfrontend

Un microfrontend de autenticación construido con React, Vite y Clean Architecture, listo para integrarse vía Module Federation.

## 🚀 Características

- **Module Federation**: Compatible con microfrontends usando Vite
- **React 18**
- **Validación de Formularios**
- **Autenticación JWT**
- **Diseño Responsivo**
- **API Integration**


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



2. **Instalar dependencias**:
```bash
npm install
```

3. **Ejecutar en modo desarrollo**:
```bash
npm run dev
```

4. **Construir para producción**:
```bash
npm run build
```


