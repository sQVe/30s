module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: [
    // Exlude index (cli) integration test.
    '/test/index.test.js',
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    // Exlude index (cli) integration test.
    '/test/integration/',
    '/node_modules/',
    '/submodules/',
  ],
};
