import { randomUUID } from 'node:crypto';

const users = [];

export class UserModel {
  static async findAll() {
    return users;
  }

  static async create(data) {
    const user = {
      id: randomUUID(),
      email: data.email,
      role: data.role,
      tenantId: data.tenantId ?? null,
      createdAt: new Date().toISOString(),
    };

    users.push(user);

    return user;
  }
}
