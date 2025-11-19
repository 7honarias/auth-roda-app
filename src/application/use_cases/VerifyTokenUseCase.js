export class VerifyTokenUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute() {
    try {
      const accessToken = this.authRepository.getAccessToken();
      
      if (!accessToken) {
        return {
          success: false,
          data: { isValid: false, user: null },
          error: null,
        };
      }

      const response = await this.authRepository.verifyToken();
      
      return {
        success: true,
        data: response,
        error: null,
      };
    } catch (error) {
      this.authRepository.clearTokens();
      
      return {
        success: false,
        data: { isValid: false, user: null },
        error: error.message || 'Token inválido',
      };
    }
  }
}