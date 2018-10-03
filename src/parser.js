const fs = require(`fs`);
const path = require('path');
const { promisify } = require('util');

const snippets = require('../submodules/30-seconds-of-code/snippet_data/snippets.json')
  .data;
const { enforceSingleNewLine, mapValues } = require('./helpers');

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
    { code, example, id, tags, description: text },
    enforceSingleNewLine
  );

(async () => {
  await promisify(fs.writeFile)(
    path.resolve(__dirname, FILE_NAME),
    JSON.stringify(snippets.map(createItem))
  );

  return console.log(`Successfully created ${FILE_NAME} file.`);
})();

module.exports = {
  createItem,
  // TODO: Write file function.
};
