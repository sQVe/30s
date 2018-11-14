module.exports = {
  declarationKeyword: 'import',
  environments: ['browser', 'node', 'jest'],
  importStatementFormatter({ importStatement }) {
    return importStatement.replace(/;$/, '')
  },
  sortImports: false,
}
