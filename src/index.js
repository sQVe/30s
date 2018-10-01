#!/usr/bin/env node

const TerminalRenderer = require('marked-terminal');
const chalk = require('chalk');
const marked = require('marked');
const program = require('commander');
const { highlight } = require('cli-highlight');

const snippets = require('../submodules/30-seconds-of-code/snippet_data/snippets.json')
  .data;

const head = arr => arr[0];

marked.setOptions({ renderer: new TerminalRenderer() });
program.version('1.0.0').parse(process.argv);

function calcIndex(query, id) {
  let index = query.length * 10;

  if (id === query) return index;
  if (id.startsWith(query) || id.endsWith(query)) index *= 0.75;
  else index /= 2;

  return index / (id.replace(query, '').length + 1);
}

const createItem = ({
  id,
  attributes: {
    codeBlocks: [code, example],
    tags,
    text,
  },
}) => ({
  code,
  example,
  id,
  index: calcIndex(head(program.args), id),
  tags,
  text,
});
const formatNewLines = x => x.replace(/[\r\n]+/g, '\n').replace(/\n*$/, '');
const fuzzyMatchQuery = (query, x) => new RegExp(query).test(x);
const logItem = x =>
  console.log(
    [
      chalk.blue.bold(x.id),
      '-'.repeat(x.id.length),
      highlight(x.code, { language: 'javascript' }),
      '',
      highlight(x.example, { language: 'javascript' }),
      '',
      formatNewLines(marked(x.text)),
      '',
    ].join('\n')
  );
const sortByIndex = (a, b) => {
  if (a.index === b.index) return 0;
  return a.index < b.index ? 1 : -1;
};

snippets
  .filter(x => fuzzyMatchQuery(head(program.args), x.id))
  .map(createItem)
  .sort(sortByIndex)
  .forEach(logItem);
