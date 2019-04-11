import path from 'path'
import { spawnSync } from 'child_process'

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

    commands.forEach(command => {
      it(`should print help page for ${command} command`, () => {
        expect(callCli(command, '-h')).toMatchSnapshot()
        expect(callCli(command, '--help')).toMatchSnapshot()
      })
    })
  })

  describe('input safe guard', () => {
    // TODO: Write this.
  })

  commands.forEach(command => {
    describe(`${command} command`, () => {
      // TODO: Write correct it cases here.

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
