#!/usr/bin/env node
//  ┏━┓┏━┓┏━┓
//  ╺━┫┃┃┃┗━┓
//  ┗━┛┗━┛┗━┛
//
//  A CLI for 30 seconds of code snippets.
//  https://github.com/sQVe/30-seconds-of-code-cli
'use strict';

const program = require('commander');

const handler = require('./handler');

const viewer = require('./viewer');

const _require = require('../package.json'),
  version = _require.version;

program.version(version);

const addCommand = settings => {
  settings.reduce((acc, [key, ...args]) => acc[key](...args), program);
};

const commonOptions = [
  ['option', '-l, --layout <layout>', 'print in specified layout', 'iced'],
  ['option', '-j, --json', 'output in json format', false],
];
addCommand([
  ['command', 'search [query]'],
  ['description', ['Fuzzy search snippets']],
  ...commonOptions,
  [
    'action',
    (query, opts) => viewer.logSnippet(opts, handler.searchSnippets(query)),
  ],
]);
addCommand([
  ['command', 'view [id]'],
  ['description', ['View snippet']],
  ...commonOptions,
  [
    'action',
    (query, opts) => viewer.logSnippet(opts, handler.getSnippet(query)),
  ],
]);
addCommand([
  ['command', 'tag [id]'],
  ['description', ['View snippets related to tag']],
  ...commonOptions,
  [
    'action',
    (query, opts) => viewer.logSnippet(opts, handler.getSnippetsByTag(query)),
  ],
]);
program.on('--help', () =>
  console.log(
    [
      '',
      'Examples:',
      '',
      '  view all',
      '  search flatten --output json all',
      '  tag --print ic array',
    ].join('\n')
  )
);
program.parse(process.argv);
