const snippets = require('./snippets');
const { any, sortBy, startsOrEndsWith } = require('./helpers');

const fuzzyMatch = query => x => new RegExp(query).test(x.id);
const getSnippet = id => snippets.find(x => x.id === id);
const getSnippetsByTag = id => snippets.filter(x => any(x.tags, y => y === id));

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

const searchSnippets = query =>
  snippets
    .filter(fuzzyMatch(query))
    .map(setSearchRelevance(query))
    .sort(sortBy('relevance'));

module.exports = {
  getSnippet,
  getSnippetsByTag,
  searchSnippets,
};
