#!/usr/bin/env node

//  ┏━┓┏━┓┏━┓┏━┓┏━╸┏━┓
//  ┣━┛┣━┫┣┳┛┗━┓┣╸ ┣┳┛
//  ╹  ╹ ╹╹┗╸┗━┛┗━╸╹┗╸
//
//  Parser for 30 seconds of code snippets.
//  https://github.com/sQVe/30s

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import { data as snippets } from '../submodules/30-seconds-of-code/snippet_data/snippets.json';
import { enforceSingleNewLine, mapValues } from './helpers';

const FILE_NAME = 'snippets.json';

export const createItem = ({
  id,
  attributes: {
    codeBlocks: [code, example],
    tags,
    text,
  },
}) =>
  mapValues(
    { code, example, id, tags, description: text },
    enforceSingleNewLine
  );
export const writeFile = content =>
  promisify(fs.writeFile)(
    path.resolve(__dirname, FILE_NAME),
    JSON.stringify(content)
  );

(async () => {
  await writeFile(snippets.map(createItem));
  console.log(`Successfully created ${FILE_NAME} file.`);
})();
