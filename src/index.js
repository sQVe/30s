#!/usr/bin/env node

//  ┏━┓┏━┓┏━┓
//  ╺━┫┃┃┃┗━┓
//  ┗━┛┗━┛┗━┛
//
//  A CLI for 30 seconds of code snippets.
//  https://github.com/sQVe/30s

import program from 'commander';

import snippets from '../dist/snippets.json';
import { getSnippet, getSnippetsByTag, searchSnippets } from './handler';
import { printSnippet } from './printer';
import { version } from '../package.json';

const isTest = process.env.NODE_ENV === 'test';
const actions = {
  tag: (id, opts) => printSnippet(opts, getSnippetsByTag(snippets, id)),
  view: (id, opts) => printSnippet(opts, getSnippet(snippets, id)),
  search: (query, opts) => printSnippet(opts, searchSnippets(snippets, query)),
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
  ['option', '-c, --cp', 'copy code to clipboard', false],
  ['option', '-j, --json', 'output in json format', false],
  ['option', '-l, --layout <layout>', 'print in specified layout', 'iced'],
];

program.version(version);

addCommand([
  ['command', 's [query]'],
  ['alias', 'search'],
  ['description', ['fuzzy search snippets by id']],
  ...commonOptions,
  addAction('search'),
]);

addCommand([
  ['command', 't [id]'],
  ['alias', 'tag'],
  ['description', ['view snippets by tag']],
  ...commonOptions,
  addAction('tag'),
]);

addCommand([
  ['command', 'v [id]'],
  ['alias', 'view'],
  ['description', ['view snippet with id']],
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
