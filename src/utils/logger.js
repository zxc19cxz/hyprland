// Logger utility
// Simple logging functionality for the application

const logLevels = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

/**
 * Log a message with specified level
 * @param {string} level - Log level
 * @param {string} message - Log message
 */
function log(level, message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${level}: ${message}`);
}

/**
 * Log error message
 * @param {string} message - Error message
 */
function logError(message) {
  log(logLevels.ERROR, message);
}

/**
 * Log info message
 * @param {string} message - Info message
 */
function logInfo(message) {
  log(logLevels.INFO, message);
}

module.exports = {
  log,
  logError,
  logInfo,
  logLevels
};
2026-02-16 18:10:02 +08 - related update
2026-02-16 19:59:02 +08 - related update
2026-02-17 02:56:43 +08 - related update
2026-02-17 21:04:43 +08 - related update
2026-02-17 22:45:45 +08 - related update
2026-02-18 21:56:34 +08 - related update
2026-02-19 13:07:27 +08 - related update
2026-02-19 14:30:55 +08 - related update
2026-02-20 15:43:39 +08 - related update
2026-02-20 17:41:16 +08 - related update
2026-02-21 22:07:13 +08 - related update
