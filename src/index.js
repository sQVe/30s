#!/usr/bin/env node

//  ┏━┓┏━┓┏━┓
//  ╺━┫┃┃┃┗━┓
//  ┗━┛┗━┛┗━┛
//
//  A CLI for 30 seconds of code snippets.
//  https://github.com/sQVe/30-seconds-of-code-cli

const program = require('commander');

const handler = require('./handler');
const viewer = require('./viewer');

program.version('1.0.0');

program
  .command('search [query]')
  // .option('-s, --setup_mode [mode]', 'Which setup mode to use')
  .description('Fuzzy search snippets')
  .action((query, options) => {
    viewer.log(handler.searchSnippets(query));
  });

program
  .command('view [id]')
  // .option('-s, --setup_mode [mode]', 'Which setup mode to use')
  .description('View snippet')
  .action(id => {
    viewer.log(handler.getSnippet(id));
  });

program
  .command('tag [id]')
  .description('View snippets with tag')
  .action((id, options) => {
    viewer.log(handler.getSnippetsByTag(id));
  });
// program.command('*').action((id, options) => {
//   console.log(id, options);
// });

program.parse(process.argv);
