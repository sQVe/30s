#!/usr/bin/env node

//  ┏━┓┏━┓┏━┓
//  ╺━┫┃┃┃┗━┓
//  ┗━┛┗━┛┗━┛
//
//  A CLI for 30 seconds of code snippets.
//  https://github.com/sQVe/30-seconds-of-code-cli

import program from 'commander';

import * as handler from './handler';
import * as viewer from './viewer';
import { version } from '../package.json';

const isTest = process.env.NODE_ENV === 'test';
const actions = {
  tag: (id, opts) => viewer.logSnippet(opts, handler.getSnippet(id)),
  view: (id, opts) => viewer.logSnippet(opts, handler.getSnippetsByTag(id)),
  search: (query, opts) =>
    viewer.logSnippet(opts, handler.searchSnippets(query)),
};
const addCommand = settings => {
  settings.reduce((acc, [key, ...args]) => acc[key](...args), program);
};
const addAction = action => [
  'action',
  isTest
    ? // NOTE: Commander.js sadly does not include a way to hook onto given
      // actions for testing. We solve this by outputting state when NODE_ENV
      // is test.
      (input, { layout, json }) =>
        console.log(JSON.stringify([action, input, layout, !!json]))
    : actions[action],
];
const commonOptions = [
  ['option', '-l, --layout <layout>', 'print in specified layout', 'iced'],
  ['option', '-j, --json', 'output in json format', false],
];

program.version(version);

addCommand([
  ['command', 'search [query]'],
  ['description', ['Fuzzy search snippets']],
  ...commonOptions,
  addAction('search'),
]);

addCommand([
  ['command', 'tag [id]'],
  ['description', ['View snippets related to tag']],
  ...commonOptions,
  addAction('tag'),
]);

addCommand([
  ['command', 'view [id]'],
  ['description', ['View snippet']],
  ...commonOptions,
  addAction('view'),
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
