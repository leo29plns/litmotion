import winston from 'winston';

// Créer le logger avec plusieurs transports
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(), // Log vers la console
        new winston.transports.File({ filename: 'tmp/logs/combined.log' }), // Log vers un fichier
        new winston.transports.File({ filename: 'tmp/logs/error.log', level: 'error' }) // Log des erreurs uniquement
    ],
});

export default logger;