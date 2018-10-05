const TerminalRenderer = require('marked-terminal');
const chalk = require('chalk');
const marked = require('marked');
const { highlight } = require('cli-highlight');

const { enforceSingleNewLine, pick } = require('./helpers');

marked.setOptions({ renderer: new TerminalRenderer() });

const prettyPrint = x => {
  const printMap = {
    code: y => highlight(y.code, { language: 'javascript' }),
    description: y => enforceSingleNewLine(marked(y.description)),
    example: y => highlight(y.example, { language: 'javascript' }),
    id: y =>
      [
        chalk.magenta.bold(y.id),
        chalk.magenta.bold('-'.repeat(y.id.length)),
      ].join('\n'),
  };

  return x
    .map(y =>
      Object.keys(y)
        .map(k => printMap[k](y) + (k === 'id' ? '' : '\n'))
        .join('\n')
        .replace(/\n$/, '')
    )
    .join('\n\n');
};

const logSnippet = ({ layout, json }, x) => {
  const layoutMap = {
    c: 'code',
    d: 'description',
    e: 'example',
    i: 'id',
  };

  const arr = (Array.isArray(x) ? x : [x]).map(y =>
    pick(y, Array.from(layout).map(k => layoutMap[k]))
  );

  if (json) {
    console.log(JSON.stringify(arr));
  } else {
    console.log(prettyPrint(arr));
  }
};

module.exports = {
  prettyPrint,
  logSnippet,
};
