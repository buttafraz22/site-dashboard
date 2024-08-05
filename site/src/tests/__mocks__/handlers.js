import {setupServer}  from 'msw/node';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/auth/login', (req, res, ctx) => {
    return HttpResponse(
      ctx.status(200),
      ctx.json({
        username: 'testuser',
        token: 'dummy-jwt-token',
      })
    );
  }),
];

export const server = setupServer(...handlers);
