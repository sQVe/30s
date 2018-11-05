module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: [
    // Exclude index (cli) integration test.
    '/test/index.test.js',
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    // Exclude index (cli) integration test.
    '/test/integration/',
    '/node_modules/',
    '/submodules/',
  ],
}
