'use strict';

require('core-js/modules/es6.array.sort');

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const snippets = require('../.bin/snippets.json');

const _require = require('./helpers'),
  any = _require.any,
  sortBy = _require.sortBy,
  startsOrEndsWith = _require.startsOrEndsWith;

const fuzzyMatch = query => x => new RegExp(query).test(x.id);

const getSnippet = id => snippets.find(x => x.id === id);

const getSnippetsByTag = id => snippets.filter(x => any(x.tags, y => y === id));

function setSearchRelevance(query) {
  return x => {
    let relevance = query.length * 10;
    if (x.id === query)
      return _objectSpread({}, x, {
        relevance,
      });
    if (startsOrEndsWith(x.id, query)) relevance *= 0.75;
    else relevance /= 2;
    return _objectSpread({}, x, {
      relevance: relevance / (x.id.replace(query, '').length + 1),
    });
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
