const path = require('path');
const { spawnSync } = require('child_process');

const { version } = require('../package.json');

const callCli = (...args) =>
  spawnSync(path.resolve(__dirname, '../dist/cli.js'), args)
    .stdout.toString()
    .trim();
const commands = ['search', 'view', 'tag'];

describe('Cli', () => {
  describe('version option', () => {
    it('should print the package version', async () => {
      expect(callCli('-V')).toEqual(version);
      expect(callCli('--version')).toEqual(version);
    });
  });

  describe('help option', () => {
    it('should print help page', async () => {
      expect(callCli('-h')).toMatchSnapshot();
      expect(callCli('--help')).toMatchSnapshot();
    });

    commands.forEach(command => {
      it(`should print help page for ${command} command`, () => {
        expect(callCli(command, '-h')).toMatchSnapshot();
        expect(callCli(command, '--help')).toMatchSnapshot();
      });
    });
  });

  commands.forEach(command => {
    describe(`${command} command`, () => {
      it(`should output test strings`, async () => {
        expect(callCli(command, 'foo')).toEqual(
          JSON.stringify([command, 'foo', 'iced', false])
        );
        expect(callCli(command, 'foo', '--layout', 'ic')).toEqual(
          JSON.stringify([command, 'foo', 'ic', false])
        );
        expect(callCli(command, 'foo', '--json')).toEqual(
          JSON.stringify([command, 'foo', 'iced', true])
        );
      });
    });
  });
});
