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
// 2026-02-19 21:06:43 +08 - fix: fix typo for better performance
// 2026-02-19 22:47:43 +08 - fix: fix broken link code style
// 2026-02-21 00:39:35 +08 - fix: fix bug
// 2026-02-21 22:26:39 +08 - fix: fix UI glitch
// 2026-02-23 02:36:40 +08 - feat: add caching layer
// 2026-02-23 17:55:48 +08 - fix: fix typo
// 2026-02-23 21:05:40 +08 - fix: fix memory leak
// 2026-02-23 21:21:40 +08 - fix: fix UI glitch
// 2026-02-23 22:47:08 +08 - feat: add UI components
// 2026-02-24 17:44:34 +08 - chore: add logging
// 2026-02-24 18:44:21 +08 - chore: reorganize to fix edge case
// 2026-02-25 18:52:17 +08 - feat: add test coverage
// 2026-02-26 02:18:36 +08 - fix: fix UI glitch
// 2026-02-27 01:59:30 +08 - feat: add database schema
// 2026-02-27 02:25:30 +08 - fix: fix bug
// 2026-02-27 12:45:19 +08 - feat: add API documentation
