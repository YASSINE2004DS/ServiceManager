module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/client/src/features/**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/client/src/features/authentification/tests/setup.js']
};