import {
  any,
  compose,
  curry,
  descend,
  filter,
  find,
  map,
  prop,
  sort,
} from 'ramda';

import { startsOrEndsWith } from './helpers';

const fuzzyMatch = curry((query, x) => new RegExp(query).test(x.id));
export const getSnippet = (snippets, id) => find(x => x.id === id, snippets);
export const getSnippetsByTag = (snippets, id) =>
  filter(x => any(y => y === id, x.tags), snippets);

const setSearchRelevance = curry((query, x) => {
  let relevance = query.length * 10;

  if (x.id === query) return { ...x, relevance };
  if (startsOrEndsWith(x.id, query)) relevance *= 0.75;
  else relevance /= 2;

  return {
    ...x,
    relevance: relevance / (x.id.replace(query, '').length + 1),
  };
});

export const searchSnippets = (snippets, query) =>
  compose(
    sort(descend(prop('relevance'))),
    map(setSearchRelevance(query)),
    filter(fuzzyMatch(query))
  )(snippets);
