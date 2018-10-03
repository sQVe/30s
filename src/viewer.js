const TerminalRenderer = require('marked-terminal');
const chalk = require('chalk');
const marked = require('marked');
const { highlight } = require('cli-highlight');

const { enforceSingleNewLine } = require('./helpers');

marked.setOptions({ renderer: new TerminalRenderer() });

const format = x =>
  [
    chalk.magenta.bold(x.id),
    chalk.magenta.bold('-'.repeat(x.id.length)),
    highlight(x.code, { language: 'javascript' }),
    '',
    highlight(x.example, { language: 'javascript' }),
    '',
    enforceSingleNewLine(marked(x.text)),
  ].join('\n');
const log = x =>
  console.log((Array.isArray(x) ? x : [x]).map(format).join('\n\n'));

module.exports = {
  format,
  log,
};
