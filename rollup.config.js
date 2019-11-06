import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import shebang from 'rollup-plugin-add-shebang'

import pkg from './package.json'

const bundleTarget = process.env.BUILD_BUNDLE
const dependencies = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'core-js',
  'fs',
  'lib/snippets',
  'path',
]
const isArrayLike = x => x != null && typeof x[Symbol.iterator] === 'function'
const isNil = (...xs) => xs.some(x => x == null)
const isObjectLike = x => x != null && typeof x === 'object'
const isSameType = (x, y) => !isNil(x, y) && x.constructor === y.constructor
const sanitizeBundle = ({ type, ...rest }) => rest
const removeRelativePath = dep => dep.replace(/^(\.{1,2}\/)+/, '')
const external = id =>
  dependencies.map(dep => removeRelativePath(id).startsWith(dep)).some(Boolean)

const presetBundleDefaults = defaults => opts =>
  Object.entries({ ...defaults, ...opts }).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [k]:
        isObjectLike(v) && isSameType(v, defaults[k])
          ? isArrayLike(v)
            ? [...defaults[k], ...v]
            : { ...defaults[k], ...v }
          : v,
    }),
    {}
  )

const bundle = presetBundleDefaults({
  input: 'src/index.js',
  output: { exports: 'named', indent: false },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    shebang({
      include: `lib/${pkg.name}.js`,
    }),
  ],
  treeshake: true,
})

const bundles = [
  bundle({
    external,
    output: { format: 'cjs', file: `lib/${pkg.name}.js` },
    plugins: [babel({ runtimeHelpers: true })],
    type: 'cjs',
  }),
  {
    external,
    input: 'src/parser.js',
    output: { format: 'cjs', file: '.tmp/parser.js' },
    plugins: [json()],
    type: 'snippets',
  },
]

export default (() =>
  [
    ...(bundleTarget != null
      ? bundles.filter(x => x.type === bundleTarget)
      : bundles),
  ].map(sanitizeBundle))()
