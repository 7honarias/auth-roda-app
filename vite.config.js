import { defineConfig } from 'vite'
import * as packageJson from './package.json'; 

const { dependencies } = packageJson; 

import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/presentation/App.jsx',
        './RegisterForm': './src/presentation/components/RegisterForm.jsx',
      },
      shared: {
        react: {
          singleton: true, 
          requiredVersion: dependencies.react, 
        },
        'react-dom': { 
          singleton: true, 
          requiredVersion: dependencies['react-dom'], 
        },
        'react-router-dom': { 
          singleton: true, 
          requiredVersion: dependencies['react-router-dom'], 
        },
        'react-hook-form': {
          singleton: true,
          requiredVersion: dependencies['react-hook-form'],
        },
      },
    })
  ],
  build: {
    target: 'esnext',       // 🔥 IMPORTANTE
    minify: false,          // útil para dev
    modulePreload: false,   // 🔥 NECESARIO PARA MF
    cssCodeSplit: false,    // evita errores de split
  },
  server: {
    port: 5001,
    cors: true
  }
})
