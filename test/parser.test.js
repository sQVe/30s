import path from 'path'

const mockFixturesDirectory = path.join(__dirname, './fixtures')

jest.mock('fs', () => {
  const actualFs = jest.requireActual('fs')

  return {
    ...actualFs,
    readdirSync: jest.fn(() => actualFs.readdirSync(mockFixturesDirectory)),
    writeFileSync: jest.fn(),
  }
})

import fs from 'fs'

import {
  parseSections,
  run,
  sanitizeCode,
  sanitizeIdentifiers,
} from '../src/parser'

const fixtureFiles = fs.readdirSync(mockFixturesDirectory)

describe('Parser', () => {
  fixtureFiles.forEach((file) => {
    describe('when given snippet ' + file, () => {
      const content = fs.readFileSync(path.join(mockFixturesDirectory, file), {
        encoding: 'utf8',
      })

      it('should be able to parse sections', () => {
        expect(parseSections(content)).toMatchSnapshot()
      })

      it('should sanitize identifiers into id and tags', () => {
        const [identifiers] = parseSections(content)

        expect(sanitizeIdentifiers(identifiers)).toMatchSnapshot()
      })

      it('should sanitize code', () => {
        const [_, __, code] = parseSections(content)

        expect(sanitizeCode(code)).toMatchSnapshot()
      })
    })
  })

  it('should iterate over source files and create snippet data', () => {
    expect(run(mockFixturesDirectory)).toMatchSnapshot()
  })
})
