//  ┏━┓┏━┓┏━┓┏━┓┏━╸┏━┓
//  ┣━┛┣━┫┣┳┛┗━┓┣╸ ┣┳┛
//  ╹  ╹ ╹╹┗╸┗━┛┗━╸╹┗╸
//
//  Parser for 30 seconds of code snippets.
//  https://github.com/sQVe/30s

import fs from 'fs'
import path from 'path'

const commaRe = /,+/g
const identifierKeyRe = /^(title|tags):\s+/
const newlineRe = /\n+/g
const sectionRe = /---|```(?:js)?/g
const surroundingWhitespaceRe = /^\s+|\s+$/g
const parsableCharsRe = /(\${|`)/g

export const parseSections = (content) => {
  return content
    .split(sectionRe)
    .map((x) => x.replace(surroundingWhitespaceRe, ''))
    .filter(Boolean)
}
export const sanitizeIdentifiers = (identifiers) => {
  const [id, tags] = identifiers
    .split(newlineRe)
    .map((x) => x.replace(identifierKeyRe, ''))

  return [id, tags.split(commaRe)]
}

export const sanitizeCode = (code) => code.replace(parsableCharsRe, '\\$1')

export const run = (sourceDirectory) => {
  const outputPath = path.join(__dirname, 'snippets.json')

  const sourceFiles = fs
    .readdirSync(sourceDirectory)
    .map((x) => path.join(sourceDirectory, x))

  const snippets = sourceFiles.reduce((acc, file) => {
    const sections = parseSections(fs.readFileSync(file, { encoding: 'utf8' }))

    const [identifiers, description, code, example] = sections
    const [id, tags] = sanitizeIdentifiers(identifiers)

    return [
      ...acc,
      { code: sanitizeCode(code), description, example, id, tags },
    ]
  }, [])

  // eslint-disable-next-line fp/no-nil
  fs.writeFileSync(outputPath, JSON.stringify(snippets, null, 2))

  return snippets
}

const sourceDirectory = path.join(
  __dirname,
  '../submodules/30-seconds-of-code/snippets'
)

// istanbul ignore next
if (process.env.NODE_ENV !== 'test') run(sourceDirectory)
