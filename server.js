import cors from "cors";
import app from './app.js';
import routes from './routes/index.js';
import { env } from './configs/env.js';
import { logger } from './utils/logger.js';

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

    const gracefulShutdown = async (signal) => {
        logger.info(`${signal} received. Starting graceful shutdown...`);

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
