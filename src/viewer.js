const TerminalRenderer = require('marked-terminal');
const chalk = require('chalk');
const marked = require('marked');
const { highlight } = require('cli-highlight');

const { enforceSingleNewLine } = require('./helpers');

marked.setOptions({ renderer: new TerminalRenderer() });

const prettyPrint = layout => {
  const layoutMap = {
    i: x =>
      [
        chalk.magenta.bold(x.id),
        chalk.magenta.bold('-'.repeat(x.id.length)),
      ].join('\n'),
    d: x => enforceSingleNewLine(marked(x.description)),
    c: x => highlight(x.code, { language: 'javascript' }),
    e: x => highlight(x.example, { language: 'javascript' }),
  };

  return x =>
    Array.from(layout)
      .map((k, i) => layoutMap[k](x) + (i > 0 ? '\n' : ''))
      .join('\n');
};

const logSnippet = ({ layout, json }, x) => {
  if (json) {
    console.log(JSON.stringify(x));
  } else {
    console.log(
      (Array.isArray(x) ? x : [x]).map(prettyPrint(layout)).join('\n')
    );
  }
};

module.exports = {
  prettyPrint,
  logSnippet,
};
