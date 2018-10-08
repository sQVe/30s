#!/usr/bin/env node
//  ┏━┓┏━┓┏━┓┏━┓┏━╸┏━┓
//  ┣━┛┣━┫┣┳┛┗━┓┣╸ ┣┳┛
//  ╹  ╹ ╹╹┗╸┗━┛┗━╸╹┗╸
//
//  Parser for 30 seconds of code snippets.
//  https://github.com/sQVe/30-seconds-of-code-cli
'use strict';

require('core-js/modules/es6.promise');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

const fs = require(`fs`);

const path = require('path');

const _require = require('util'),
  promisify = _require.promisify;

const snippets = require('../submodules/30-seconds-of-code/snippet_data/snippets.json')
  .data;

const _require2 = require('./helpers'),
  enforceSingleNewLine = _require2.enforceSingleNewLine,
  mapValues = _require2.mapValues;

const FILE_NAME = 'snippets.json';

const createItem = ({
  id,
  attributes: {
    codeBlocks: [code, example],
    tags,
    text,
  },
}) =>
  mapValues(
    {
      code,
      example,
      id,
      tags,
      description: text,
    },
    enforceSingleNewLine
  );

const writeFile = content =>
  promisify(fs.writeFile)(
    path.resolve(__dirname, FILE_NAME),
    JSON.stringify(content)
  );

_asyncToGenerator(function*() {
  yield writeFile(snippets.map(createItem));
  return console.log(`Successfully created ${FILE_NAME} file.`);
})();

module.exports = {
  createItem,
  writeFile,
};
