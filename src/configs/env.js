import dotenv from "dotenv";
dotenv.config();

const numberFromEnv = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigins: process.env.CORS_ORIGINS || "http://localhost",

  tts: {
    dir: process.env.TTS_DIR || "public/tts",
    cleanupIntervalMinutes: numberFromEnv(process.env.TTS_CLEANUP_INTERVAL_MINUTES, 1),
    fileMaxAgeMinutes: numberFromEnv(process.env.TTS_FILE_MAX_AGE_MINUTES, 10),
  },

  brand: {
    name: process.env.BRAND_NAME || "SmartBiz AI Labs",
  },

  urls: {
    publicBase: process.env.PUBLIC_BASE_URL || "",
  },

  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
    leadTable: process.env.DB_LEADS_TABLE || "leads"
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || "gpt-5-mini",
    imageModel: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
    ttsModel: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts",
    ttsVoice: process.env.OPENAI_TTS_VOICE || "alloy",
    videoModel: process.env.OPENAI_VIDEO_MODEL || "sora-2",
  },

  n8n: {
    webhookUrl: process.env.N8N_WEBHOOK_URL || "",
  },

  hubspot: {
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN || "",
  },

  otp: {
    expiryMinutes: numberFromEnv(process.env.OTP_EXPIRY_MINUTES, 10),
  },

  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || "",
    authToken: process.env.TWILIO_AUTH_TOKEN || "",
    callerId: process.env.TWILIO_CALLER_ID || "",
  },

  voice: {
    gatherLanguage: process.env.VOICE_GATHER_LANGUAGE || "en-US",
    sayVoice: process.env.VOICE_TWILIO_VOICE || "Polly.Nicole",
  },

  email: {
    from: process.env.EMAIL_FROM || "",
    companyInbox: process.env.EMAIL_COMPANY_INBOX || "",
    smtpHost: process.env.EMAIL_SMTP_HOST || "",
    smtpPort: numberFromEnv(process.env.EMAIL_SMTP_PORT, 587),
    smtpUser: process.env.EMAIL_SMTP_USER || "",
    smtpPass: process.env.EMAIL_SMTP_PASS || "",
  },

  google: {
    calendarId: process.env.GOOGLE_CALENDAR_ID || "",
    followupCalendarId: process.env.GOOGLE_FOLLOWUP_CALENDAR_ID || "",
    timezone: process.env.GOOGLE_CALENDAR_TIMEZONE || "America/Toronto",
    credentialsJson: process.env.GOOGLE_CREDENTIALS_JSON || "",
    refreshToken: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN || "",
    oauthRedirectUri: process.env.GOOGLE_CALENDAR_REDIRECT_URL || "",
  },

  assistant: {
    smsSessionMaxAgeMinutes: numberFromEnv(process.env.ASSISTANT_SMS_SESSION_MAX_AGE_MINUTES, 240),
  },
};
