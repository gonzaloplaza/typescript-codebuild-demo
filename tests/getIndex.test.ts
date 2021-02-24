import request from 'supertest';
import { Server } from '../src/server';

const server = new Server(8000).invoke();

describe('GET /', () => {
  it('should get success index response', async () => {
    const res = await request(server).get('/').send();
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('success');
    expect(res.body.success).toBeTruthy();
  });

  it('should receive 404 not found response', async () => {
    const res = await request(server).get('/invalid-route').send();
    expect(res.status).toEqual(404);
  });
});
