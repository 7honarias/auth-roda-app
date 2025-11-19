export class AuthRepository {
  
  async login(loginRequestDto) {
    throw new Error('Method not implemented');
  }

  async register(registerRequestDto) {
    throw new Error('Method not implemented');
  }
  
  async refreshToken(refreshTokenRequestDto) {
    throw new Error('Method not implemented');
  }

  async verifyToken() {
    throw new Error('Method not implemented');
  }

  saveTokens(accessToken, refreshToken, expiresIn) {
    throw new Error('Method not implemented');
  }

  getAccessToken() {
    throw new Error('Method not implemented');
  }

  getRefreshToken() {
    throw new Error('Method not implemented');
  }

  clearTokens() {
    throw new Error('Method not implemented');
  }

  isTokenExpired() {
    throw new Error('Method not implemented');
  }
}
