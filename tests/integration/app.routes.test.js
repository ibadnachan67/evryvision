import request from 'supertest';

import app from '../../src/app.js';

describe('app routes', () => {
  it('returns the API root response', async () => {
    const response = await request(app).get('/api');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'EvryVision API' });
  });

  it('returns a health response', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
