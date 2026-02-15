// Helper utilities
// This file contains common helper functions used throughout the application

/**
 * Format date to readable string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  return date.toLocaleDateString();
}

/**
 * Generate random ID
 * @returns {string} Random ID
 */
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

module.exports = {
  formatDate,
  generateId
};
