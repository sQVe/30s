import { any, sortBy, startsOrEndsWith } from './helpers';

const fuzzyMatch = query => x => new RegExp(query).test(x.id);
export const getSnippet = (snippets, id) => snippets.find(x => x.id === id);
export const getSnippetsByTag = (snippets, id) =>
  snippets.filter(x => any(x.tags, y => y === id));

function setSearchRelevance(query) {
  return x => {
    let relevance = query.length * 10;

    if (x.id === query) return { ...x, relevance };
    if (startsOrEndsWith(x.id, query)) relevance *= 0.75;
    else relevance /= 2;

    return {
      ...x,
      relevance: relevance / (x.id.replace(query, '').length + 1),
    };
  };
}

export const searchSnippets = (snippets, query) =>
  snippets
    .filter(fuzzyMatch(query))
    .map(setSearchRelevance(query))
    .sort(sortBy('relevance'));
