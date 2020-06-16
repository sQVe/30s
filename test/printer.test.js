jest.mock('clipboardy')

import { head } from 'ramda'
import { writeSync as writeToClipboard } from 'clipboardy'

import { printSnippet, colorizedPrint } from '../src/printer'

const layouts = [...Array.from('itced'), 'itced']
const snippet = {
  code: 'const head = arr => arr[0];',
  description: [
    'Returns the head of a list.',
    'Use `arr[0]` to return the first element of the passed array.',
  ].join('\n'),
  example: 'head([1, 2, 3]); // 1',
  id: 'head',
  tags: ['array', 'beginner'],
}

describe('Printer', () => {
  describe('colorizedPrint', () => {
    it('should print in color based on given snippet', () => {
      expect(
        colorizedPrint(
          Object.keys(snippet).map((k) => ({ [k]: snippet[k] }))
        ).toString()
      ).toMatchSnapshot()
      expect(colorizedPrint([snippet])).toMatchSnapshot()
    })
  })

  describe('printSnippet', () => {
    jest.spyOn(global.console, 'log').mockImplementation(() => {
      // Noop.
    })

    it('should handle snippets in a array', () => {
      printSnippet({ layout: 'ic' }, [snippet])

      expect(head(console.log.mock.calls)).toMatchSnapshot()
    })

    it('should handle snippet in object', () => {
      printSnippet({ layout: 'ic' }, snippet)

      expect(head(console.log.mock.calls)).toMatchSnapshot()
    })

    it('should handle no snippet', () => {
      printSnippet({ layout: 'ic' }, undefined)

      expect(head(console.log.mock.calls)).toBeUndefined()
    })

    it('should copy write blocks to clipboard', () => {
      printSnippet({ layout: 'iced', cp: true }, snippet)

      expect(writeToClipboard).toHaveBeenCalledTimes(1)
      expect(writeToClipboard).toHaveBeenCalledWith(snippet.code)
    })

    it('should copy multiple code blocks to clipboard', () => {
      printSnippet({ layout: 'iced', cp: true }, [snippet, snippet])

      expect(writeToClipboard).toHaveBeenCalledTimes(1)
      expect(writeToClipboard).toHaveBeenCalledWith(
        [snippet.code, snippet.code].join('\n')
      )
    })

    layouts.forEach((layout) => {
      describe(`with layout set to "${layout}"`, () => {
        it('should log JSON given json flag', () => {
          printSnippet({ layout, json: true }, snippet)

          expect(head(console.log.mock.calls)).toMatchSnapshot()
        })

        it('should print in color by default', () => {
          printSnippet({ layout }, snippet)

          expect(head(console.log.mock.calls)).toMatchSnapshot()
        })
      })
    })
  })
})
