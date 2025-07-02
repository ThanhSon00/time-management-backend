import request from 'supertest';
import { app } from '../../src/main';
import { INestApplication } from '@nestjs/common';
import setupTestDB from '../utils/setupTestDB';

setupTestDB();

describe('Auth Module', () => {
  let server: INestApplication;
  let runningApp: any;
  const newUserFirstName = `Tester`;
  const newUserLastName = `E2E`;
  const newUserEmail = `test@example.com`;
  const inProduction = process.env.NODE_ENV === 'production';

  if (inProduction) {
    runningApp = 'http://localhost:3000'; // Adjust this if your production URL is different
  }

  beforeAll(async () => {
    if (inProduction) return;
    server = await app();
    await server.init();
    runningApp = server.getHttpServer();
  });

  afterAll(async () => {
    if (inProduction) return;
    runningApp = null;
    await server.close();
  });

  describe('Registration', () => {
    it('should successfully: /api/v1/auth/email/register (POST)', () => {
      return request(runningApp)
        .post('/api/v1/auth/email/register')
        .send({
          email: newUserEmail,
          firstName: newUserFirstName,
          lastName: newUserLastName,
        })
        .expect(204);
    });
  });

  describe('Login', () => {
    it('should successfully for user with email: /api/v1/auth/email/login (POST)', async () => {
      await request(runningApp)
        .post('/api/v1/auth/email/register')
        .send({
          email: newUserEmail,
          firstName: newUserFirstName,
          lastName: newUserLastName,
        })
        .expect(204);

      await request(runningApp)
        .post('/api/v1/auth/email/login')
        .send({ email: newUserEmail })
        .expect(200);
    });
  });
});
