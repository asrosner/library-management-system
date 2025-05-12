const request = require('supertest');
const app = require('./app');

test('test get returns at least 1 record', async () => {
  const response = await request(app).get('/api/books');
  expect(response.status).toBe(200);
  expect(response.body.length).toBeGreaterThan(0);
});

test('test checkout post returns valid status', async () => {
  const body = { "id": 1};
  const response = await request(app)
	.post('/api/checkout')
	.send(body);
  expect(response.status).toBe(200);
});

test('test return post returns valid status', async () => {
  const body = { "id": 1};
  const response = await request(app)
	.post('/api/return')
	.send(body);
  expect(response.status).toBe(200);
});
