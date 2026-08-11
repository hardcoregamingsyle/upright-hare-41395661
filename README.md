# Secure API

A secure Node.js REST API with SQLite, JWT authentication, and security best practices.

## Features

- User registration and login with bcrypt password hashing
- JWT-based authentication
- Rate limiting on API endpoints
- Helmet security headers
- Input validation with Zod
- SQLite database
- CORS support

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your secrets
npm start
```

## API Endpoints

- `GET /health` - Health check
- `POST /api/register` - Register new user
- `POST /api/login` - Login and get JWT token
- `GET /api/items` - Get user's items (requires auth)
- `POST /api/items` - Create item (requires auth)
- `DELETE /api/items/:id` - Delete item (requires auth)

## Security

- Passwords hashed with bcrypt (cost 12)
- JWT tokens expire after 1 hour by default
- Rate limiting: 100 requests/15min general, 5 auth attempts/15min
- Input validation on all endpoints
- No stack traces exposed in production
