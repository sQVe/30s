# 30s

_A command-line application for [`30 seconds of code`](https://github.com/30-seconds/30-seconds-of-code/) snippets._

[![NPM](https://img.shields.io/npm/v/30s.svg)](https://www.npmjs.com/package/30s) [![build status](https://travis-ci.org/sQVe/30s.svg?branch=master)](https://travis-ci.org/sQVe/30s) [![coveralls](https://coveralls.io/repos/github/sQVe/30s/badge.svg)](https://coveralls.io/github/sQVe/30s) [![dependabot status](https://api.dependabot.com/badges/status?host=github&repo=sQVe/30s)](https://dependabot.com) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![license](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](https://github.com/sQVe/30s/blob/develop/LICENSE)

![Demo](/.github/demo.gif?raw=true)

<hr>

## Features

- Written in JavaScript (ES6)
- View, view by tag and search snippets
- Show what you find necessary by picking a layout
- Colorful output or JSON
- Copy all code to clipboard
- Automatically updates with new snippet changes
- Works on Linux, Mac and Windows

## Installation

Pick one of the following options to install the command-line application:

#### Option 1: NPM / Yarn

```bash
npm install -g 30s
```

```bash
yarn add -g 30s
```

#### Option 2: Source

```bash
$ git clone git@github.com:sQVe/30s.git
$ cd 30s/
$ npm install
$ node lib/index.js <command> <query>
```

## Usage

#### Commands

| Short version | Long version | Description                          |
| :-----------: | :----------: | ------------------------------------ |
|      `s`      |   `search`   | Fuzzy search (RegExp) snippets by id |
|      `t`      |    `tag`     | View snippets by tag                 |
|      `v`      |    `view`    | View snippet with id                 |

#### Options

| Short version | Long version | Description                                                      |
| :-----------: | :----------: | ---------------------------------------------------------------- |
|     `-c`      |    `--cp`    | Copy snippet code to clipboard                                   |
|     `-j`      |   `--json`   | Print output in JSON format                                      |
|     `-l`      |  `--layout`  | Print output with specified [layout](#layout) (default: "itced") |
|     `-h`      |   `--help`   | Output usage information                                         |

##### Layout

| Layout key | Description                |
| :--------: | -------------------------- |
|    `i`     | Output snippet id          |
|    `t`     | Output snippet tags        |
|    `c`     | Output snippet code        |
|    `e`     | Output snippet examples    |
|    `d`     | Output snippet description |

#### Examples

| Example                      | Description                                                                  |
| :--------------------------- | ---------------------------------------------------------------------------- |
| `30s v head`                 | View snippet with id `head`                                                  |
| `30s view head`              | View snippet with id `head`                                                  |
| `30s t array`                | View snippets by tag `array`                                                 |
| `30s tag array`              | View snippets by tag `array`                                                 |
| `30s s all`                  | Find all snippets with an id that contains `all`                             |
| `30s search all`             | Find all snippets with an id that contains `all`                             |
| `30s view merge --cp`        | View snippet with id `merge` and copy its code                               |
| `30s view merge --json`      | View snippet with id `merge` and output as JSON                              |
| `30s search all --layout ce` | Find all snippets with an id that contains `all` and output code and example |

## Contributing

#### Bug reports & feature requests

Please use the [issue tracker](https://github.com/sQVe/30s/issues) to report bugs or file feature requests.

#### Developing

Pull requests are more than welcome. Do the following to start helping out:

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Run `npm install` in the created directory to install all necessary dependencies.

Optional steps:

3. Uninstall `30s` if it's already installed: `npm uninstall -g 30s`
4. Link it to the global module directory: `npm link`

#### Style guide & conventions

Try to follow [functional programming](https://en.wikipedia.org/wiki/Functional_programming) best practices. Use pure functions and [`Ramda`](https://github.com/ramda/ramda) when possible.

Write commits following: [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). This enables us to automatically release new versions together with [`semantic-release`](https://github.com/semantic-release/semantic-release) on `fix` and `feat` commit types.

[`prettier`](https://github.com/prettier/prettier) and [`eslint-config-sqve`](https://github.com/sQVe/eslint-config-sqve) (a config based on [`standardjs`](https://standardjs.com)) enforces our styling and formatting. It runs automatically on `pre-commit` and is also checked for issues on **Travis CI**.

#### Roadmap

See the [development board](https://github.com/sQVe/30s/projects/1) for a detailed development roadmap. Below are a short outline of important improvements:

- Autocomplete with `omelette`
- Replace `commander` with basic `yargs` and own logic

## Thanks

A big thank you to the core team and all the contributers at [`30-seconds-of-code`](https://github.com/Chalarangelo/30-seconds-of-code) for creating an awesome curated collection of snippets.

## License

```
Creative Commons License
CC0 1.0 Universal
```
