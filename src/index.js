//  ┏━┓┏━┓┏━┓
//  ╺━┫┃┃┃┗━┓
//  ┗━┛┗━┛┗━┛
//
//  A CLI for 30 seconds of code snippets.
//  https://github.com/sQVe/30s

import program from 'commander'
import { reduce } from 'ramda'

import snippets from '../lib/snippets.json'
import { getSnippet, getSnippetsByTag, searchSnippets } from './handler'
import { printSnippet } from './printer'
import { version } from '../package.json'

const isTest = process.env.NODE_ENV === 'test'
const actions = {
  tag: (id, opts) => printSnippet (opts, getSnippetsByTag (snippets, id)),
  view: (id, opts) => printSnippet (opts, getSnippet (snippets, id)),
  search: (query, opts) => printSnippet (opts, searchSnippets (snippets, query)),
}
const addCommand = settings =>
  reduce ((acc, [key, ...args]) => acc[key] (...args), program, settings)

const addAction = action => [
  'action',
  (input, opts) => {
    if (!input) return program.outputHelp ()

    return isTest
      ? // NOTE: Commander.js sadly does not include a way to hook onto given
        // actions for integration testing. We solve this by outputting state
        // when NODE_ENV is test.
        console.log (
          JSON.stringify ([action, input, !!opts.cp, !!opts.json, opts.layout])
        )
      : actions[action] (input, opts)
  },
]
const commonOptions = [
  ['option', '-c, --cp', 'copy code to clipboard', false],
  ['option', '-j, --json', 'output in json format', false],
  ['option', '-l, --layout <layout>', 'print in specified layout', 'itced'],
]

program.version (version)

addCommand ([
  ['command', 's [query]'],
  ['alias', 'search'],
  ['description', ['fuzzy search snippets by id']],
  ...commonOptions,
  addAction ('search'),
])

addCommand ([
  ['command', 't [id]'],
  ['alias', 'tag'],
  ['description', ['view snippets by tag']],
  ...commonOptions,
  addAction ('tag'),
])

addCommand ([
  ['command', 'v [id]'],
  ['alias', 'view'],
  ['description', ['view snippet with id']],
  ...commonOptions,
  addAction ('view'),
])

program.on ('--help', () =>
  console.log (
    [
      '',
      'Examples:',
      '  v head',
      '  view head',
      '',
      '  s -j flatten',
      '  search --json flatten',
      '',
      '  t -l ic array',
      '  tag --layout ic array',
    ].join ('\n')
  )
)

program.parse (process.argv)
if (process.argv.length <= 2) {
  program.outputHelp ()
}
