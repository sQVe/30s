module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: [
    // Exlude cli integration test.
    '/test/cli.test.js',
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    // Exlude cli integration test.
    '/test/cli.test.js',
    '/node_modules/',
    '/submodules/',
  ],
};
