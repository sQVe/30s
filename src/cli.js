//  ┏━╸╻  ╻
//  ┃  ┃  ┃
//  ┗━╸┗━╸╹

import program from 'commander'
import { reduce } from 'ramda'

import snippets from '../lib/snippets.json'
import { version } from '../package.json'
import {
  getSnippet,
  getSnippetsByTag,
  randomSnippet,
  searchSnippets,
} from './handler'
import { printSnippet } from './printer'

const isTest = process.env.NODE_ENV === 'test'
const actions = {
  random: (opts) => printSnippet(opts, randomSnippet(snippets)),
  search: (opts, query) => printSnippet(opts, searchSnippets(snippets, query)),
  tag: (opts, id) => printSnippet(opts, getSnippetsByTag(snippets, id)),
  view: (opts, id) => printSnippet(opts, getSnippet(snippets, id)),
}
const addCommand = (settings) =>
  reduce((acc, [key, ...args]) => acc[key](...args), program, settings)

const addAction = (action) => [
  'action',
  (...args) =>
    ((input, opts = {}) => {
      if (!input) return program.outputHelp()

      return isTest
        ? // NOTE: Commander.js sadly does not include a way to hook onto given
          // actions for integration testing. We solve this by outputting state
          // when NODE_ENV is test.
          console.log(
            JSON.stringify([action, input, !!opts.cp, !!opts.json, opts.layout])
          )
        : actions[action](opts, input)
    })(...(action === 'random' ? [true, args[0]] : args)),
]

const commonOptions = [
  ['option', '-c, --cp', 'copy code to clipboard', false],
  ['option', '-j, --json', 'output in json format', false],
  ['option', '-l, --layout <layout>', 'print in specified layout', 'itced'],
]

program.version(version)

addCommand([
  ['command', 'r'],
  ['alias', 'random'],
  ['description', ['view random snippet']],
  ...commonOptions,
  addAction('random'),
])

addCommand([
  ['command', 's [query]'],
  ['alias', 'search'],
  ['description', ['fuzzy search snippets by id']],
  ...commonOptions,
  addAction('search'),
])

addCommand([
  ['command', 't [id]'],
  ['alias', 'tag'],
  ['description', ['view snippets by tag']],
  ...commonOptions,
  addAction('tag'),
])

addCommand([
  ['command', 'v [id]'],
  ['alias', 'view'],
  ['description', ['view snippet with id']],
  ...commonOptions,
  addAction('view'),
])

addCommand([
  ['command', '* [id]'],
  ['description', ['view snippet with id']],
  addAction('view'),
])

program.on('--help', () =>
  console.log(
    [
      '',
      'Examples:',
      '  30s head',
      '  30s v head',
      '  30s view head',
      '',
      '  30s r',
      '  30s random',
      '',
      '  30s s -j flatten',
      '  30s search --json flatten',
      '',
      '  30s t -l ic array',
      '  30s tag --layout ic array',
    ].join('\n')
  )
)

program.parse(process.argv)
if (process.argv.length <= 2) {
  program.outputHelp()
}
