import { LoginRequestDto, LoginResponseDto } from '../../domain/models/AuthDtos.js';

export class LoginUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(cedula, password) {
    try {
      const loginRequest = new LoginRequestDto(cedula, password);
      const response = await this.authRepository.login(loginRequest);
      console.log('Login Response:', response);
      this.authRepository.saveTokens(response.accessToken, response.refreshToken, response.expiresIn);
      
      return {
        success: true,
        data: response,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message || 'Error al iniciar sesión',
      };
    }
  }
}