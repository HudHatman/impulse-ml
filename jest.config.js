/** @type {import('jest').Config} */
module.exports = {
  transform: {
    '^.+\\.ts$': 'babel-jest',
  },
  testMatch: ['**/tests/**/*.test.ts'],
  testEnvironment: 'node',
};
