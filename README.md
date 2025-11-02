# SmartBiz AI Labs Site Node.js Services

Node.js/Express backend that powers the SmartBiz AI Labs marketing site, demo experiences, and multi-channel assistant. It exposes REST endpoints for web chat, ROI calculations, lead capture, and orchestrates voice/SMS assistants that sync with HubSpot, Google Calendar, Twilio, and OpenAI.

## Highlights

- Multi-channel AI assistant that runs on web chat, Twilio voice, and SMS using the OpenAI Assistants API.
- Lead pipeline with OTP verification, HubSpot CRM sync, and optional n8n webhook triggers.
- ROI calculator, contact form, and demo onboarding endpoints used by the public site.
- Demo automation workflows with mock CRM fetch/push endpoints for interactive product tours.
- MySQL persistence for leads, assistant sessions, actions, and history via `config/db.schema.sql`.

## Tech Stack

- Node.js (ES Modules) with Express and CORS.
- MySQL via `mysql2/promise` connection pooling.
- OpenAI SDK for conversational flows and content generation.
- Twilio voice + SMS, Nodemailer, Google Calendar APIs, and HubSpot CRM.
- Nodemon-powered local development workflow.

## Project Layout

```
app.js                  Express app factory (JSON + URL-encoded parsing)
server.js               Bootstraps CORS, mounts routers, starts the HTTP server
config/                 Environment parsing and MySQL schema helpers
modules/                Feature routers grouped by domain (site, demo, assistant, integrations)
services/               Business logic, third-party integrations, and data stores
utils/                  Shared utilities such as structured logging
routes/index.js         Aggregates feature routers under versioned `/api/v0.1` paths
```

## API Surface

| Area | Endpoint | Description |
| ---- | -------- | ----------- |
| Site Chat | `POST /api/v0.1/site/chatbot` | Routes visitor chat messages to the OpenAI-powered assistant. |
| ROI Tools | `POST /api/v0.1/site/calculate/roi` | Returns estimated automation ROI based on submitted form metrics. |
| Site Contact | `POST /api/v0.1/site/contact/call`<br>`POST /api/v0.1/site/contact/message`<br>`POST /api/v0.1/site/demo/details/request` | Handles contact form submissions, schedules meetings, and opens assistant sessions. |
| Demo APIs | `POST /api/v0.1/demo/chatbot/`<br>`POST /api/v0.1/demo/workflow/`<br>`POST /api/v0.1/demo/workflow/mock/crm/fetch/`<br>`POST /api/v0.1/demo/workflow/mock/crm/push/`<br>`POST /api/v0.1/demo/aiagent/home/seller/` | Back endpoints that drive interactive demo flows and mock CRM interactions. |
| Lead Collection | `POST /api/v0.1/lead/start`<br>`POST /api/v0.1/lead/verify` | Issues OTPs, drives assistant outreach, and verifies visitors before unlocking demos. |
| Assistant | `/api/v0.1/assistant/*` | Twilio voice/SMS webhooks, assistant turns, follow-up automation, and audio asset helpers. |
| Google OAuth | `GET /api/v0.1/integrations/google/calendar/oauth/start`<br>`GET /api/v0.1/integrations/google/calendar/oauth/callback` | Utility endpoints to obtain Google Calendar OAuth tokens. |

> Refer to the module files under `modules/` for request/response specifics and additional endpoints.

## Getting Started

### Prerequisites

- Node.js 20 LTS (18+ works, but 20 is recommended) and npm.
- MySQL 8 (or compatible) accessible by the server.
- Twilio, OpenAI, HubSpot, and Google Cloud credentials if you plan to exercise those integrations.

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create a `.env` file in the project root and populate the required settings:

```bash
cp .env.example .env  # if you maintain an example file
```

If an example file is not available, start with the snippet below. Remove any keys you do not use.

```dotenv
PORT=3000
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=smartbiz
DB_PASS=smartbiz
DB_NAME=smartbiz

OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5-mini

HUBSPOT_ACCESS_TOKEN=pat-...

TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_CALLER_ID=+15555550123

PUBLIC_BASE_URL=https://your-ngrok-or-domain

GOOGLE_CREDENTIALS_JSON={"installed":{...}}
GOOGLE_CALENDAR_ID=primary
GOOGLE_CALENDAR_REDIRECT_URL=https://your-app/api/v0.1/integrations/google/calendar/oauth/callback
GOOGLE_CALENDAR_REFRESH_TOKEN=...

EMAIL_SMTP_HOST=smtp.sendgrid.net
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=apikey
EMAIL_SMTP_PASS=...
EMAIL_FROM=updates@smartbizai.io
EMAIL_COMPANY_INBOX=hello@smartbizai.io

N8N_WEBHOOK_URL=https://hooks.n8n.cloud/...
```

Key environment categories:

- **Core:** `PORT`, `NODE_ENV`, `CORS_ORIGINS`, `PUBLIC_BASE_URL`
- **Database:** `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_LEADS_TABLE`
- **Assistant:** `OPENAI_API_KEY`, `OPENAI_MODEL`, `ASSISTANT_SMS_SESSION_MAX_AGE_MINUTES`
- **Voice/SMS:** `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_CALLER_ID`, `VOICE_GATHER_LANGUAGE`, `VOICE_TWILIO_VOICE`
- **Email:** `EMAIL_FROM`, `EMAIL_COMPANY_INBOX`, `EMAIL_SMTP_*`
- **Calendar:** `GOOGLE_CREDENTIALS_JSON`, `GOOGLE_CALENDAR_ID`, `GOOGLE_FOLLOWUP_CALENDAR_ID`, `GOOGLE_CALENDAR_TIMEZONE`, `GOOGLE_CALENDAR_REFRESH_TOKEN`, `GOOGLE_CALENDAR_REDIRECT_URL`
- **CRM & Automation:** `HUBSPOT_ACCESS_TOKEN`, `N8N_WEBHOOK_URL`

### Database Setup

1. Create the target database and user in MySQL (if they do not already exist).
2. Run the schema migration helper:

```bash
npm run migrate
```

This executes every statement defined in `config/db.schema.sql` and provisions tables for leads, assistant sessions, messages, actions, and support cases.

### Run the Server

```bash
# Development (auto-reload)
npm run dev

# Production-style start
npm start
```

The server listens on `PORT` and exposes all routes under `/api/v0.1/*`. CORS origins are whitelisted via `CORS_ORIGINS`.

## Integrations

- **OpenAI Assistants** – Generates responses, tracks collected metadata, and drives downstream workflow actions.
- **Twilio Voice/SMS** – Handles inbound calls, IVR flows, outbound calls triggered from lead capture, and SMS conversations.
- **HubSpot CRM** – Saves leads, assistant cases, and follow-up data when `HUBSPOT_ACCESS_TOKEN` is present.
- **Google Calendar** – Books meetings, checks availability, and provides OAuth helper endpoints for retrieving refresh tokens.
- **Email + SMS Notifications** – Via Nodemailer (SMTP) and Twilio helpers, delivering branded transactional messages.
- **n8n Webhook** – Optional outbound hook for additional automation sequences.

## Development Notes

- Logging is handled through `utils/logger.js`; adjust levels there for local debugging.
- The `services/chat.history.store.js` module keeps short-lived in-memory chat transcripts; Redis or another store can replace it if persistent history is required.
- Extend the assistant behavior by editing `services/assistant.conversation.service.js` (system prompt, schema, and execution) and `services/assistant.actions.service.js` for action handlers.
- Additional API routes can be added under `modules/<feature>/` and mounted in `routes/index.js`.

## Useful Scripts

- `npm start` – Start the HTTP server.
- `npm run dev` – Start with Nodemon for hot reload development.
- `npm run migrate` – Initialize or update the MySQL schema from `config/db.schema.sql`.

## Troubleshooting

- Ensure `PUBLIC_BASE_URL` is reachable by Twilio when testing voice/SMS flows locally (ngrok, Cloudflare tunnel, etc.).
- Missing OpenAI or Twilio credentials will raise runtime assertions inside the assistant services; watch the server logs for guidance.
- If Google Calendar OAuth fails, double-check `GOOGLE_CREDENTIALS_JSON` (use an OAuth Web Client) and the redirect URI configured in Google Cloud.

