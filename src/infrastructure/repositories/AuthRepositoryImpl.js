import axios from 'axios';
import { LoginResponseDto, RegisterResponseDto, RefreshTokenResponseDto, VerifyTokenResponseDto } from '../../domain/models/AuthDtos.js';

export class AuthRepositoryImpl {
  constructor(baseURL = 'http://localhost:8000/api/v1') {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
              await this.refreshTokenProcess();
              const token = this.getAccessToken();
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            this.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async login(loginRequestDto) {
    try {
      const response = await this.axiosInstance.post('/auth/login', loginRequestDto.toJson());
      return LoginResponseDto.fromJson(response.data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }

  async register(registerRequestDto) {
    try {
      const response = await this.axiosInstance.post('/auth/register', registerRequestDto.toJson());
      return RegisterResponseDto.fromJson(response.data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
  }

  async refreshToken(refreshTokenRequestDto) {
    try {
      const response = await this.axiosInstance.post('/auth/refresh-token', refreshTokenRequestDto.toJson());
      return RefreshTokenResponseDto.fromJson(response.data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al refrescar token');
    }
  }

  async verifyToken() {
    try {
      const response = await this.axiosInstance.get('/auth/verify-token');
      return VerifyTokenResponseDto.fromJson(response.data);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token inválido');
    }
  }

  async refreshTokenProcess() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No hay refresh token');
      }

      const refreshRequest = new RefreshTokenRequestDto(refreshToken);
      const response = await this.axiosInstance.post('/auth/refresh-token', refreshRequest.toJson());
      
      this.saveTokens(response.accessToken, response.refreshToken, response.expiresIn);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  saveTokens(accessToken, refreshToken, expiresIn) {
    const expirationTime = Date.now() + (expiresIn * 1000);
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('tokenExpiration', expirationTime.toString());
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiration');
  }

  isTokenExpired() {
    const expirationTime = localStorage.getItem('tokenExpiration');
    if (!expirationTime) {
      return true;
    }
    
    const now = Date.now();
    return now >= parseInt(expirationTime);
  }
}