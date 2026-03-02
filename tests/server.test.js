import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server.js';

describe('Server Tests', () => {
  it('should return 200 for root path', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
  });

  it('should return 404 for non-existent routes', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.status).toBe(404);
  });

  it('should have security headers', async () => {
    const response = await request(app).get('/');
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-frame-options']).toBeDefined();
  });

  it('should serve static files from public directory', async () => {
    const response = await request(app).get('/styles.css');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/css/);
  });

  it('should have compression enabled', async () => {
    const response = await request(app)
      .get('/')
      .set('Accept-Encoding', 'gzip');
    expect(response.headers['content-encoding']).toBe('gzip');
  });
});
