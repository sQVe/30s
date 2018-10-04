const fs = require('fs');

const { createItem, writeFile } = require('../src/parser');
const { last } = require('../src/helpers');

jest.mock('fs', () => ({
  writeFile: jest.fn(() => {}),
}));
const stringifySpy = jest.spyOn(JSON, 'stringify');

describe('Parser', () => {
  describe('createItem()', () => {
    const attributes = {
      codeBlocks: ['code', 'example'],
      tags: ['tags'],
      text: 'text',
    };
    const snippet = {
      id: 'id',
      attributes,
    };

    it('should create item', () => {
      expect(createItem(snippet)).toMatchSnapshot();
    });

    it('should enforce single newlines between paragraphs', () => {
      expect(
        createItem({
          ...snippet,
          attributes: { ...attributes, text: 'foo\n\nbar' },
        }).description
      ).toEqual('foo\nbar');
    });

    it('should remove all newlines from ending', () => {
      expect(
        createItem({
          ...snippet,
          attributes: { ...attributes, text: 'foo\n\n' },
        }).description
      ).toEqual('foo');
    });
  });

  describe('writeFile()', () => {
    beforeEach(() => {
      writeFile({ foo: true });
    });

    it('should write content as JSON', () => {
      expect(stringifySpy).toHaveBeenCalled();
    });

    it('should call fs.writeFile with a path and content', () => {
      const [path, content] = last(fs.writeFile.mock.calls);

      expect(path).toMatch(/.*\/src\/snippets.json/);
      expect(content).toMatchSnapshot();
    });
  });
});
