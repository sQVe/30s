#!/usr/bin/env node

//  ┏━┓┏━┓┏━┓
//  ╺━┫┃┃┃┗━┓
//  ┗━┛┗━┛┗━┛
//
//  A CLI for 30 seconds of code snippets.
//  https://github.com/sQVe/30-seconds-of-code-cli

import program from 'commander';

import snippets from '../build/snippets.json';
import { getSnippet, getSnippetsByTag, searchSnippets } from './handler';
import { print } from './printer';
import { version } from '../package.json';

const isTest = process.env.NODE_ENV === 'test';
const actions = {
  tag: (id, opts) => print(opts, getSnippetsByTag(snippets, id)),
  view: (id, opts) => print(opts, getSnippet(snippets, id)),
  search: (query, opts) => print(opts, searchSnippets(snippets, query)),
};
const addCommand = settings => {
  settings.reduce((acc, [key, ...args]) => acc[key](...args), program);
};
const addAction = action => [
  'action',
  isTest
    ? // NOTE: Commander.js sadly does not include a way to hook onto given
      // actions for integration testing. We solve this by outputting state
      // when NODE_ENV is test.
      (input, { layout, json }) =>
        console.log(JSON.stringify([action, input, layout, !!json]))
    : actions[action],
];
const commonOptions = [
  ['option', '-l, --layout <layout>', 'print in specified layout', 'iced'],
  ['option', '-c, --cp', 'copy code blocks', false],
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
      '  view all',
      '  search flatten --output json all',
      '  tag --print ic array',
    ].join('\n')
  )
);
program.parse(process.argv);
