import Renderer from 'marked-terminal';
import chalk from 'chalk';
import marked from 'marked';
import { writeSync as writeToClipboard } from 'clipboardy';
import { highlight } from 'cli-highlight';

import { enforceSingleNewLine, pick } from './helpers';

marked.setOptions({ renderer: new Renderer() });

export const colorizedPrint = x => {
  const printMap = {
    code: y => highlight(y, { language: 'javascript' }),
    description: y => enforceSingleNewLine(marked(y)),
    example: y => highlight(y, { language: 'javascript' }),
    id: y => chalk.magenta.bold(y),
  };
  const print = y =>
    Object.entries(y)
      .map(([k, v]) => printMap[k](v) + (k === 'id' ? '' : '\n'))
      .join('\n')
      .replace(/\n$/, '');

  return x.map(print).join('\n\n');
};

export const printSnippet = ({ cp, layout, json }, x) => {
  const arr = Array.isArray(x) ? x : [x];
  const layoutMap = {
    c: 'code',
    d: 'description',
    e: 'example',
    i: 'id',
  };
  const keysByLayout = Array.from(layout).map(k => layoutMap[k]);

  if (cp) {
    writeToClipboard(arr.map(y => y.code).join('\n'));
  }
  if (json) {
    console.log(JSON.stringify(arr.map(y => pick(y, keysByLayout))));
  } else {
    console.log(colorizedPrint(arr.map(y => pick(y, keysByLayout))));
  }
};
