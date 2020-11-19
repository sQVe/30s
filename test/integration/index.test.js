import { spawnSync } from 'child_process'
import path from 'path'

import { version } from '../../package.json'

const cliPath = path.resolve(__dirname, '../../lib/30s.js')

const callCli = (...args) =>
  spawnSync('node', [cliPath, ...args])
    .stdout.toString()
    .trim()
const commands = ['search', 'view', 'tag']

describe('Cli', () => {
  describe('version option', () => {
    it('should print the package version', async () => {
      expect(callCli('-V')).toEqual(version)
      expect(callCli('--version')).toEqual(version)
    })
  })

  describe('help option', () => {
    it('should print help page', async () => {
      expect(callCli('-h')).toMatchSnapshot()
      expect(callCli('--help')).toMatchSnapshot()
    })

    commands.forEach((command) => {
      it(`should print help page for ${command} command`, () => {
        expect(callCli(command, '-h')).toMatchSnapshot()
        expect(callCli(command, '--help')).toMatchSnapshot()
      })
    })
  })

  describe(`random command`, () => {
    it(`should output test strings`, async () => {
      expect(callCli('random')).toEqual(
        JSON.stringify(['random', true, false, false, 'itced'])
      )
      expect(callCli('random', '--layout', 'ic')).toEqual(
        JSON.stringify(['random', true, false, false, 'ic'])
      )
      expect(callCli('random', '--json')).toEqual(
        JSON.stringify(['random', true, false, true, 'itced'])
      )
      expect(callCli('random', '--cp')).toEqual(
        JSON.stringify(['random', true, true, false, 'itced'])
      )
    })
  })

  commands.forEach((command) => {
    describe(`${command} command`, () => {
      it(`should output test strings`, async () => {
        expect(callCli(command, 'foo')).toEqual(
          JSON.stringify([command, 'foo', false, false, 'itced'])
        )
        expect(callCli(command, 'foo', '--layout', 'ic')).toEqual(
          JSON.stringify([command, 'foo', false, false, 'ic'])
        )
        expect(callCli(command, 'foo', '--json')).toEqual(
          JSON.stringify([command, 'foo', false, true, 'itced'])
        )
        expect(callCli(command, 'foo', '--cp')).toEqual(
          JSON.stringify([command, 'foo', true, false, 'itced'])
        )
      })
    })
  })
})
