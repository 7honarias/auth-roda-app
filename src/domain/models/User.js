export class User {
  constructor(id, cedula, firstName, lastName, isActive, createdAt, updatedAt) {
    this.id = id;
    this.cedula = cedula;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json) {
    return new User(
      json.id,
      json.cedula,
      json.firstName,
      json.lastName,
      json.isActive,
      json.createdAt,
      json.updatedAt
    );
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  toJson() {
    return {
      id: this.id,
      cedula: this.cedula,
      firstName: this.firstName,
      lastName: this.lastName,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}