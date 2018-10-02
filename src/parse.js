const fs = require(`fs`);
const path = require('path');
const { promisify } = require('util');

const snippets = require('../submodules/30-seconds-of-code/snippet_data/snippets.json')
  .data;
const { isString, mapValues } = require('./helpers');

const FILE_NAME = 'snippets.json';

const enforceSingleNewLine = x =>
  isString(x) ? x.replace(/[\r\n]+/g, '\n').replace(/[\r\n]*$/, '') : x;
const createItem = ({
  id,
  attributes: {
    codeBlocks: [code, example],
    tags,
    text,
  },
}) => mapValues({ code, example, id, tags, text }, enforceSingleNewLine);

(async () => {
  await promisify(fs.writeFile)(
    path.resolve(__dirname, FILE_NAME),
    JSON.stringify(snippets.map(createItem))
  );

  // eslint-disable-next-line no-console
  return console.log(`Successfully created ${FILE_NAME} file.`);
})();
