export class LoginRequestDto {
  constructor(cedula, password) {
    this.cedula = cedula;
    this.password = password;
  }

  toJson() {
    return {
      cedula: this.cedula,
      password: this.password,
    };
  }
}

export class LoginResponseDto {
  constructor(accessToken, refreshToken, expiresIn, user) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.user = user;
  }

  static fromJson(json) {
    console.log('LoginResponseDto fromJson called with:', json);
    return new LoginResponseDto(
      json.data.access_token,
      json.data.refresh_token,
      json.data.expires_in,
    );
  }
}

export class RegisterRequestDto {
  constructor(cedula, password, firstName, lastName, phone, address) {
    this.cedula = cedula;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.address = address;
  }

  toJson() {
    return {
      cedula: this.cedula,
      first_name: this.firstName,
      last_name: this.lastName,
      phone: this.phone,
      address: this.address,
      password: this.password,
      confirm_password: this.password,
    };
  }
}

export class RegisterResponseDto {
  constructor(message, user) {
    this.message = message;
    this.user = user;
  }

  static fromJson(json) {
    return new RegisterResponseDto(
      json.message,
      json.user
    );
  }
}

export class RefreshTokenRequestDto {
  constructor(refreshToken) {
    this.refreshToken = refreshToken;
  }

  toJson() {
    return {
      refreshToken: this.refreshToken,
    };
  }
}

export class RefreshTokenResponseDto {
  constructor(accessToken, refreshToken, expiresIn) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
  }

  static fromJson(json) {
    return new RefreshTokenResponseDto(
      json.accessToken,
      json.refreshToken,
      json.expiresIn
    );
  }
}

export class VerifyTokenResponseDto {
  constructor(isValid, user) {
    this.isValid = isValid;
    this.user = user;
  }

  static fromJson(json) {
    return new VerifyTokenResponseDto(
      json.isValid,
      json.user
    );
  }
}
