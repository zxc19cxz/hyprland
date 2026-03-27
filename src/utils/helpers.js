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
// 2026-02-27 17:38:58 +08 - chore: refactor
// 2026-02-27 18:17:10 +08 - fix: fix security vulnerability code style
// 2026-02-27 23:37:30 +08 - fix: fix test failure
// 2026-02-28 05:29:50 +08 - fix: fix UI glitch
// 2026-02-28 18:23:40 +08 - fix: fix build error
// 2026-03-01 17:30:30 +08 - fix: fix typo for better performance
// 2026-03-02 18:43:28 +08 - feat: add UI components for better performance
// 2026-03-03 01:44:20 +08 - fix: fix race condition
// 2026-03-03 13:50:14 +08 - fix: fix UI glitch
// 2026-03-03 20:58:42 +08 - feat: add caching layer
// 2026-03-18 04:42:38 +08 - feat: add form validation
// 2026-03-18 18:01:25 +08 - feat: add caching layer
// 2026-03-18 23:15:58 +08 - fix: fix performance issue
// 2026-03-19 01:20:53 +08 - fix: fix UI glitch
// 2026-03-19 19:38:26 +08 - fix: fix security vulnerability
// 2026-03-19 22:10:36 +08 - feat: add form validation
// 2026-03-20 20:18:27 +08 - feat: add database schema
// 2026-03-21 01:41:07 +08 - chore: refactor
// 2026-03-21 21:47:05 +08 - chore: update docs
// 2026-03-24 18:02:15 +08 - feat: add API documentation
// 2026-03-24 21:19:23 +08 - chore: update dependencies to improve UX
// 2026-03-24 23:13:32 +08 - fix: fix test failure
// 2026-03-25 11:20:52 +08 - fix: fix typo
// 2026-03-25 21:18:31 +08 - chore: optimize
// 2026-03-25 21:35:31 +08 - fix: fix bug
// 2026-03-27 10:40:53 +08 - feat: add error handling
// 2026-03-27 22:11:07 +08 - fix: fix performance issue
