const { head } = require('../src/helpers');
const { logSnippet, prettyPrint } = require('../src/viewer');

const layouts = [...Array.from('idce'), 'idce'];
const snippet = {
  code: 'const head = arr => arr[0];',
  example: 'head([1, 2, 3]); // 1',
  id: 'head',
  description: [
    'Returns the head of a list.',
    'Use `arr[0]` to return the first element of the passed array.',
  ].join('\n'),
};

describe('Viewer', () => {
  describe('prettyPrint()', () => {
    it('should pretty print based on given snippet', () => {
      expect(
        prettyPrint(
          Object.keys(snippet).map(k => ({ [k]: snippet[k] }))
        ).toString()
      ).toMatchSnapshot();
      expect(prettyPrint([snippet])).toMatchSnapshot();
    });
  });

  describe('logSnippet()', () => {
    const stringifySpy = jest.spyOn(JSON, 'stringify');
    global.console = { ...global.console, log: jest.fn() };

    afterEach(() => {
      console.log.mockClear();
      stringifySpy.mockClear();
    });

    it('should handle snippets in a array', () => {
      logSnippet({ layout: 'ic' }, [snippet]);

      expect(head(console.log.mock.calls)).toMatchSnapshot();
    });

    it('should handle snippet in object', () => {
      logSnippet({ layout: 'ic' }, snippet);

      expect(head(console.log.mock.calls)).toMatchSnapshot();
    });

    layouts.forEach(layout => {
      it('should log JSON given json flag', () => {
        logSnippet({ layout, json: true }, snippet);

        expect(head(console.log.mock.calls)).toMatchSnapshot();
      });

      it('should log prettyPrint() by default', () => {
        logSnippet({ layout }, snippet);
        expect(head(console.log.mock.calls)).toMatchSnapshot();
      });
    });
  });
});
