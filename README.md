# Node.js Service Template

Modern Express starter for small REST-style services. This template wires up sensible defaults for configuration, logging, routing, and CORS so you can focus on business logic.

## Features
- Opinionated Express bootstrap with JSON + URL-encoded parsers.
- Centralised environment management via `dotenv`.
- Versioned routing scaffold with sample Health and Hello World endpoints.
- ISO-8601 console logger that supports environment-aware debug logging.
- Ready-to-use CORS configuration with allow-list support.

## Tech Stack
- Node.js (ES Modules) with Express.
- `cors` for cross-origin control.
- `dotenv` for environment variables.
- `nodemon` for live-reload during development.

## Directory Layout
```text
app.js                Express app factory (body parsing, base middleware)
server.js             Entry point; loads env, CORS, routes, and graceful shutdown
configs/env.js        Environment variable parsing and defaults
routes/               REST endpoints grouped by feature (health, sample)
utils/logger.js       Timestamped structured console logging helper
common/, modules/, services/  Reserved folders for shared logic and business features
public/               Static assets (optional)
```

## Requirements
- Node.js 20 LTS (18+ compatible) and npm.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables (see below).
3. Launch the service:
   ```bash
   # Development (auto-reload)
   npm run dev

   # Production-style startup
   npm start
   ```
   The server binds to `PORT` and mounts all routes beneath `/api/v0.1/*`.

## Environment Variables
Create a `.env` file in the project root. The template understands the following keys:

| Variable | Purpose | Default |
| --- | --- | --- |
| `PORT` | HTTP port the server listens on | `3000` |
| `NODE_ENV` | Runtime environment (`development` / `production` / etc.) | `development` |
| `CORS_ORIGINS` | Comma-separated list of allowed origins | `http://localhost` |
| `BRAND_NAME` | Optional branding reference used in logs | `SmartBiz AI Labs` |

Example:
```dotenv
PORT=3000
NODE_ENV=development
CORS_ORIGINS=https://example.com,http://localhost:4200
BRAND_NAME=SmartBiz AI Labs
```

## API Endpoints
| Area | Method & Path | Description |
| --- | --- | --- |
| Health | `GET /api/v0.1/health` | Returns `{ "status": "ok" }` for uptime monitoring. |
| Sample | `GET /api/v0.1/sample` | Demonstrates logging and JSON responses. |

Add new endpoints in `routes/` and mount them inside `routes/index.js` under the desired version prefix.

## Logging
- `utils/logger.js` decorates console output with ISO timestamps and log levels.
- `logger.debug` only emits in `NODE_ENV=development`.
- Update log formatting or sinks in one place to affect the whole service.

## Package Scripts
- `npm start` – Run the service with Node.
- `npm run dev` – Run with Nodemon for auto-reloads.

## Deployment Notes
- Provide production `.env` values via your hosting platform.
- Ensure only trusted origins appear in `CORS_ORIGINS`.
- Use a process manager (PM2, systemd, container orchestrator) to restart on failure; graceful shutdown hooks are already in place.

## Next Steps
- Add request validation, authentication, and persistence layers in `modules/` or `services/`.
- Expand the API documentation as new routes are added.
- Wire in automated tests (Jest, Supertest) to guard critical endpoints.

## License
This project is released under the terms of the license in `license.txt`.
