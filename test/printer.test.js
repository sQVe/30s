import { readSync as readFromClipboard } from 'clipboardy';

const { head } = require('../src/helpers');
const { printSnippet, colorizedPrint } = require('../src/printer');

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

describe('Printer', () => {
  describe('colorizedPrint', () => {
    it('should print in color based on given snippet', () => {
      expect(
        colorizedPrint(
          Object.keys(snippet).map(k => ({ [k]: snippet[k] }))
        ).toString()
      ).toMatchSnapshot();
      expect(colorizedPrint([snippet])).toMatchSnapshot();
    });
  });

  describe('printSnippet', () => {
    const stringifySpy = jest.spyOn(JSON, 'stringify');
    global.console = { ...global.console, log: jest.fn() };

    afterEach(() => {
      console.log.mockClear();
      stringifySpy.mockClear();
    });

    it('should handle snippets in a array', () => {
      printSnippet({ layout: 'ic' }, [snippet]);

      expect(head(console.log.mock.calls)).toMatchSnapshot();
    });

    it('should handle snippet in object', () => {
      printSnippet({ layout: 'ic' }, snippet);

      expect(head(console.log.mock.calls)).toMatchSnapshot();
    });

    layouts.forEach(layout => {
      it('should log JSON given json flag', () => {
        printSnippet({ layout, json: true }, snippet);

        expect(head(console.log.mock.calls)).toMatchSnapshot();
      });

      it('should print in color by default', () => {
        printSnippet({ layout }, snippet);

        expect(head(console.log.mock.calls)).toMatchSnapshot();
      });
    });

    // Do not run copy & paste tests on headless linux environments like
    // Travis CI.
    if (process.platform !== 'linux' || process.env.DISPLAY) {
      it('should copy code blocks to clipboard', () => {
        printSnippet({ layout: 'iced', cp: true }, snippet);

        expect(readFromClipboard()).toEqual(snippet.code);
      });

      it('should copy multiple code blocks to clipboard', () => {
        printSnippet({ layout: 'iced', cp: true }, [snippet, snippet]);

        expect(readFromClipboard()).toEqual(`${snippet.code}\n${snippet.code}`);
      });
    }
  });
});
