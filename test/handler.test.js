const snippets = [
  { id: 'bar', tags: ['array'] },
  { id: 'foobar', tags: ['array'] },
  { id: 'foo', tags: ['array'] },
  { id: 'fefoolo', tags: ['object'] },
  { id: 'bazfoo', tags: ['object'] },
];

const {
  getSnippet,
  getSnippetsByTag,
  searchSnippets,
} = require('../src/handler');

describe('Handler', () => {
  describe('getSnippet()', () => {
    it('should find snippet by id', () => {
      expect(getSnippet(snippets, 'foo')).toEqual(snippets[2]);
    });
  });

  describe('getSnippetsByTag()', () => {
    it('should find snippets by tag', () => {
      expect(getSnippetsByTag(snippets, 'array')).toEqual(snippets.slice(0, 3));
    });
  });

  describe('searchSnippets()', () => {
    it('should find snippets fuzzy matching query', () => {
      expect(searchSnippets(snippets, 'foo')).toMatchSnapshot();
    });

    it('should sort by relevance', () => {
      const [x, y, z] = searchSnippets(snippets, 'foo');

      expect(x.relevance >= y.relevance && y.relevance >= z.relevance).toBe(
        true
      );
    });
  });
});
