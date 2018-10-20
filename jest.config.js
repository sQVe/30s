module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: [
    // Exlude index (cli) integration test.
    '/test/index.test.js',
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    // Exlude index (cli) integration test.
    '/test/index.test.js',
    '/node_modules/',
    '/submodules/',
  ],
};
