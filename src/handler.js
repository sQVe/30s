import {
  always,
  any,
  compose,
  descend,
  divide,
  filter,
  find,
  flip,
  ifElse,
  lensProp,
  map,
  multiply,
  prop,
  set,
  sort,
} from 'ramda'

import { randomNumberInRange, startsOrEndsWith } from './helpers'

const fuzzyMatch = (query) => (x) => new RegExp(query).test(x.id)
export const getSnippet = (snippets, id) => find((x) => x.id === id, snippets)
export const getSnippetsByTag = (snippets, id) =>
  filter((x) => any((y) => y === id, x.tags), snippets)

export const randomSnippet = (snippets) =>
  snippets[randomNumberInRange(0, snippets.length - 1)]

const computeRelevance = (id, query) => {
  const base = query.length * 10
  const diffInChars = id.replace(query, '').length + 1
  const divideByDiffInChars = flip(divide)(diffInChars)
  const multi = ifElse(
    always(startsOrEndsWith(id, query)),
    multiply(0.75),
    multiply(0.5)
  )

  if (id === query) return base
  return compose(divideByDiffInChars, multi)(base)
}

const setSearchRelevance = (query) => (x) =>
  set(lensProp('relevance'), computeRelevance(x.id, query), x)

export const searchSnippets = (snippets, query) =>
  compose(
    sort(descend(prop('relevance'))),
    map(setSearchRelevance(query)),
    filter(fuzzyMatch(query))
  )(snippets)
