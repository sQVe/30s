jest.mock('fs', () => ({
  writeFileSync: jest.fn(() => ''),
}));

import fs from 'fs';
import { last } from 'ramda';

import { createItem, writeFile } from '../src/parser';

const stringifySpy = jest.spyOn(JSON, 'stringify');
jest.spyOn(global.console, 'log').mockImplementation(() => {});

describe('Parser', () => {
  describe('createItem', () => {
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

  describe('writeFile', () => {
    beforeEach(() => {
      writeFile({ foo: true });
    });

    it('should write content as JSON', () => {
      expect(stringifySpy).toHaveBeenCalled();
    });

    it('should call fs.writeFile with a path and content', () => {
      const [path, content] = last(fs.writeFileSync.mock.calls);

      expect(path).toMatch(/.*\/src\/snippets.json/);
      expect(content).toMatchSnapshot();
    });
  });
});
