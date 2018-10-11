import Renderer from 'marked-terminal';
import chalk from 'chalk';
import marked from 'marked';
import { writeSync as writeToClipboard } from 'clipboardy';
import { highlight } from 'cli-highlight';

import { enforceSingleNewLine, pick } from './helpers';

marked.setOptions({ renderer: new Renderer() });

export const prettyPrint = x => {
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

export const print = ({ cp, layout, json }, x) => {
  const arr = Array.isArray(x) ? x : [x];
  const layoutMap = {
    c: 'code',
    d: 'description',
    e: 'example',
    i: 'id',
  };
  const layoutKeys = Array.from(layout).map(k => layoutMap[k]);

  if (cp) {
    writeToClipboard(arr.map(y => y.code).join('\n'));
  }
  if (json) {
    console.log(JSON.stringify(arr.map(y => pick(y, layoutKeys))));
  } else {
    console.log(prettyPrint(arr.map(y => pick(y, layoutKeys))));
  }
};
