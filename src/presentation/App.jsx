import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm.jsx';
import { RegisterForm } from './components/RegisterForm.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

export const AuthApp = ( {onLoginSuccess}) => {
  const [currentView, setCurrentView] = useState('login');

  const switchToRegister = () => setCurrentView('register');
  const switchToLogin = () => setCurrentView('login');

  return (
    <AuthProvider>
      <div className="auth-app">
        {currentView === 'login' ? (
          <LoginForm onSwitchToRegister={switchToRegister} onLoginSuccess={onLoginSuccess} />
        ) : (
          <RegisterForm onSwitchToLogin={switchToLogin} />
        )}
      </div>
    </AuthProvider>
  );
};

export const App = ({ onLoginSuccess }) => {
  return (
    <div className="auth-mf-app">
      <AuthApp onLoginSuccess={onLoginSuccess}/>
    </div>
  );
};



export default App;