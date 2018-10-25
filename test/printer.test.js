jest.mock('clipboardy');

import { writeSync as writeToClipboard } from 'clipboardy';

import { head } from '../src/helpers';
import { printSnippet, colorizedPrint } from '../src/printer';

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
    jest.spyOn(global.console, 'log').mockImplementation(() => {});

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

    it('should copy write blocks to clipboard', () => {
      printSnippet({ layout: 'iced', cp: true }, snippet);

      expect(writeToClipboard).toHaveBeenCalledTimes(1);
      expect(writeToClipboard).toHaveBeenCalledWith(snippet.code);
    });

    it('should copy multiple code blocks to clipboard', () => {
      printSnippet({ layout: 'iced', cp: true }, [snippet, snippet]);

      expect(writeToClipboard).toHaveBeenCalledTimes(1);
      expect(writeToClipboard).toHaveBeenCalledWith(
        [snippet.code, snippet.code].join('\n')
      );
    });
  });
});
