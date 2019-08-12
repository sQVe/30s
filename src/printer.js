import Renderer from 'marked-terminal'
import chalk from 'chalk'
import marked from 'marked'
import { compose, is, join, map, pick, prop, replace, toPairs } from 'ramda'
import { highlight } from 'cli-highlight'
import { writeSync as writeToClipboard } from 'clipboardy'

import { enforceSingleNewLine } from './helpers'

marked.setOptions ({ renderer: new Renderer () })

export const colorizedPrint = x => {
  const printMap = {
    code: y => highlight (y, { language: 'javascript' }),
    description: y => enforceSingleNewLine (marked (y)),
    example: y => highlight (y, { language: 'javascript' }),
    id: y => chalk.magenta.bold (y),
    tags: compose (
      chalk.gray.italic,
      join (', ')
    ),
  }
  const print = y =>
    compose (
      replace (/\n$/, ''),
      join ('\n'),
      map (([k, v]) => printMap[k] (v) + (k === 'id' ? '' : '\n')),
      toPairs
    ) (y)

  return compose (
    join ('\n\n'),
    map (print)
  ) (x)
}

export const printSnippet = ({ cp, layout, json }, x) => {
  const arr = is (Array, x) ? x : [x]
  const layoutMap = {
    c: 'code',
    d: 'description',
    e: 'example',
    i: 'id',
    t: 'tags',
  }
  const keysByLayout = map (k => layoutMap[k]) (Array.from (layout || 'itced'))

  if (x == null) return ''
  if (cp) {
    writeToClipboard (
      compose (
        join ('\n'),
        map (prop ('code'))
      ) (arr)
    )
  }

  const pickedSnippet = map (pick (keysByLayout)) (arr)

  return compose (
    console.log,
    json ? JSON.stringify : colorizedPrint
  ) (pickedSnippet)
}
