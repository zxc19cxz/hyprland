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
