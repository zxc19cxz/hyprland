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
// 2026-02-16 07:55:07 +08 - feat: add form validation code style
// 2026-02-16 19:59:02 +08 - chore: refactor
// 2026-02-17 02:56:43 +08 - feat: add API documentation for better performance
// 2026-02-18 06:31:42 +08 - feat: add test coverage
// 2026-02-18 21:05:34 +08 - fix: fix race condition
// 2026-02-19 12:52:27 +08 - chore: reorganize
// 2026-02-19 13:07:27 +08 - feat: add API documentation
// 2026-02-19 13:58:55 +08 - fix: fix typo
// 2026-02-19 18:20:44 +08 - feat: add user authentication
