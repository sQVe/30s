const { NODE_ENV } = process.env

const defaultPlugins = [['ramda', { useES: NODE_ENV === 'es' }]]

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        corejs: 3,
        loose: true,
        modules: NODE_ENV === 'test' ? 'auto' : false,
        targets: { node: 8 },
        useBuiltIns: 'usage',
      },
    ],
  ],
  plugins: ['cjs', 'test'].includes(NODE_ENV)
    ? [...defaultPlugins, ['@babel/transform-runtime']]
    : defaultPlugins,
}
