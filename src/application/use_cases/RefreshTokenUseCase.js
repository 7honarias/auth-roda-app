import { RefreshTokenRequestDto } from '../../domain/models/AuthDtos.js';

export class RefreshTokenUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute() {
    try {
      const refreshToken = this.authRepository.getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No hay refresh token disponible');
      }

      const refreshRequest = new RefreshTokenRequestDto(refreshToken);
      const response = await this.authRepository.refreshToken(refreshRequest);
      
      this.authRepository.saveTokens(response.accessToken, response.refreshToken, response.expiresIn);
      
      return {
        success: true,
        data: response,
        error: null,
      };
    } catch (error) {
      this.authRepository.clearTokens();
      
      return {
        success: false,
        data: null,
        error: error.message || 'Error al refrescar token',
      };
    }
  }
}