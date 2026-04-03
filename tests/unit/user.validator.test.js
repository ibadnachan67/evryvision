import { createUserSchema } from '../../src/validators/user.validator.js';

describe('createUserSchema', () => {
  it('accepts a valid payload', () => {
    const result = createUserSchema.safeParse({
      body: {
        email: 'user@example.com',
        password: 'password123',
        role: 'admin',
      },
      params: {},
      query: {},
    });

    expect(result.success).toBe(true);
  });

  it('rejects an invalid payload', () => {
    const result = createUserSchema.safeParse({
      body: {
        email: 'invalid-email',
        password: 'short',
      },
      params: {},
      query: {},
    });

    expect(result.success).toBe(false);
  });
});
