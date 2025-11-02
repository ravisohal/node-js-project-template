import cors from "cors";
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import app from './app.js';
import routes from './routes/index.js';
import { startTTSCleanup, stopTTSCleanup } from './services/cleanup.tts.cache.service.js';

(async function main() {

    const CORS_ORIGINS = env.corsOrigins || '';
    const allowedOrigins = CORS_ORIGINS.split(',').map(origin => origin.trim()).filter(origin => origin.length > 0);

    const corsOptions = {
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        credentials: true,
        optionsSuccessStatus: 204,
    };

    app.use(cors(corsOptions));
    app.options("*", cors(corsOptions));
    app.use('/', routes);

    logger.info("Allowed CORS Origins:", allowedOrigins);

    const server = app.listen(env.port, () => logger.info(`✅ SmartBiz AI Labs Server running on port ${env.port}`));

    // Start TTS cleanup service
    try {
        await startTTSCleanup();
        logger.info('TTS cleanup service started successfully');
    } catch (err) {
        logger.error('Failed to start TTS cleanup service:', err);
        process.exit(1);
    }

    const gracefulShutdown = async (signal) => {
        logger.info(`${signal} received. Starting graceful shutdown...`);

        await stopTTSCleanup();

        // Close server
        server.close(() => {
            logger.info('Server closed');
            process.exit(0);
        });

        // Force close after timeout
        setTimeout(() => {
            logger.error('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

})();
