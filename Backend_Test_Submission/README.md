# Backend Test Submission

Enhanced Express server with comprehensive endpoints and authentication testing for the evaluation service.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure authentication:**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your authentication token
   # The provided token is already configured in .env.example
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

## Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Root endpoint with API documentation |
| GET | `/health` | Health check endpoint |
| GET | `/error` | Error simulation endpoint |
| GET | `/test-auth` | Authentication test endpoint |
| POST | `/log-test` | Test logging functionality |
| GET | `/user/:id` | Get user by ID |
| POST | `/data` | Submit data with POST request |

## Testing Authentication

Run the comprehensive test script:
```bash
node test-auth.js
```

## Environment Variables

Create a `.env` file with:
```env
LOG_API_URL=http://20.244.56.144/evaluation-service/logs
LOG_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbm9oaXRhbXVraGVyamVlQGdtYWlsLmNvbSIsImV4cCI6MTc1NTU4MjQ3NCwiaWF0IjoxNzU1NTgxNTc0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZmM0MTg2MzEtMDA0ZC00N2FkLWIxYTItMmMzMjExZGViYjJjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW5vaGl0YSBtdWtoZXJqZWUiLCJzdWIiOiJhMGQwZDRiNy0zOTgwLTQzN2EtYTQyZS05YWEwZGFjZDkzZWEifSwiZW1haWwiOiJhbm9oaXRhbXVraGVyamVlQGdtYWlsLmNvbSIsIm5hbWUiOiJhbm9oaXRhIG11a2hlcmplZSIsInJvbGxObyI6IjExNjAwNzIyMDIwIiwiYWNjZXNzQ29kZSI6IlV3VmZKeiIsImNsaWVudElEIjoiYTBkMGQ0YjctMzk4MC00MzdhLWE0MmUtOWFhMGRhY2Q5M2VhIiwiY2xpZW50U2VjcmV0IjoiblZSS1R2ZHpzRVZXZ2V2eCJ9.a3sFHYM5CWZ5KH1f3INAiZA1yARn3nPtUhomahAtjn4
```

## Usage Examples

### Test authentication:
```bash
curl http://localhost:3000/test-auth
```

### Test logging:
```bash
curl -X POST http://localhost:3000/log-test \
  -H "Content-Type: application/json" \
  -d '{"level":"info","message":"Hello from curl!"}'
```

### Get user data:
```bash
curl http://localhost:3000/user/123
```

### Submit data:
```bash
curl -X POST http://localhost:3000/data \
  -H "Content-Type: application/json" \
  -d '{"name":"test","value":"sample data"}'
```

## Features

- ✅ Comprehensive logging to evaluation service
- ✅ Bearer token authentication
- ✅ Multiple test endpoints
- ✅ Request/response logging
- ✅ Error handling
- ✅ Health check endpoint
- ✅ JSON API responses
- ✅ Input validation
- ✅ 404 handling

## Logs

All logs are sent to the evaluation service at `20.244.56.144` using the provided authentication token.
