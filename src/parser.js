#!/usr/bin/env node

//  ┏━┓┏━┓┏━┓┏━┓┏━╸┏━┓
//  ┣━┛┣━┫┣┳┛┗━┓┣╸ ┣┳┛
//  ╹  ╹ ╹╹┗╸┗━┛┗━╸╹┗╸
//
//  Parser for 30 seconds of code snippets.
//  https://github.com/sQVe/30s

import fs from 'fs';
import path from 'path';
import { map } from 'ramda';

import { data as snippets } from '../submodules/30-seconds-of-code/snippet_data/snippets.json';
import { enforceSingleNewLine } from './helpers';

const FILE_NAME = 'snippets.json';

export const createItem = ({
  id,
  attributes: {
    codeBlocks: [code, example],
    tags,
    text,
  },
}) => map(enforceSingleNewLine, { code, example, id, tags, description: text });
export const writeFile = content =>
  fs.writeFileSync(path.resolve(__dirname, FILE_NAME), JSON.stringify(content));

writeFile(map(createItem)(snippets));
