import { RegisterRequestDto } from '../../domain/models/AuthDtos.js';

export class RegisterUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async execute(cedula, password, firstName, lastName, phone, address) {
    try {
      const registerRequest = new RegisterRequestDto(cedula, password, firstName, lastName, phone, address);
      const response = await this.authRepository.register(registerRequest);
      
      return {
        success: true,
        data: response,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message || 'Error al registrar usuario',
      };
    }
  }
}