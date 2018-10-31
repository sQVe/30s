# 30s

_A command-line application for [`30 seconds of code`](https://github.com/30-seconds/30-seconds-of-code/) snippets._

[![npm](https://img.shields.io/npm/v/30s.svg)](https://www.npmjs.com/package/30s) [![build status](https://travis-ci.org/sQVe/30s.svg?branch=master)](https://travis-ci.org/sQVe/30s) [![coveralls](https://coveralls.io/repos/github/sQVe/30s/badge.svg)](https://coveralls.io/github/sQVe/30s) [![dependabot status](https://api.dependabot.com/badges/status?host=github&repo=sQVe/30s)](https://dependabot.com) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![license](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](https://github.com/sQVe/30s/blob/develop/LICENSE)

![Demo](/.github/demo.gif?raw=true)

<hr>

## Features

- Written in JavaScript (ES6)
- View, view by tag and search snippets
- Only show what you find necessary by picking a layout
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
$ ./lib/index.js <command> <query>
```

## Usage

#### Commands

```bash
s, search                     # fuzzy search snippets by id
t, tag                        # view snippets by tag
v, view                       # view snippet with id
```

#### Options

```bash
-c, --cp                      # copy code to clipboard
-j, --json                    # output in json format
-l, --layout                  # print in specified layout (default: "iced")
                                # i: id
                                # c: code
                                # e: example
                                # d: description
-h, --help                    # output usage information
```

#### Examples

```bash
30s view head                 # view snippet with id "head"
```

```bash
30s tag array                 # view snippets by tag "array"
```

```bash
30s search all                # find all snippets that include "all"
```

```bash
30s view merge --json         # view snippet with id "merge" and output as json
```

```bash
30s search all --layout ce    # find all snippets that include "all" and print only code and example
```

```bash
30s view merge --cp           # view snippet with id "merge" and copy it's code
```

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

Code is written with an intent to follow [functional programming](https://en.wikipedia.org/wiki/Functional_programming) best practices. Write pure functions and utilize [`Ramda`](https://github.com/ramda/ramda) when possible.

Styling and formatting is enforced by [`prettier`](https://github.com/prettier/prettier) and [`eslint-config-sqve`](https://github.com/sQVe/eslint-config-sqve) (a config based on [`airbnb/javascript`](https://github.com/airbnb/javascript)). Code is automatically formatted and fixed on `pre-commit` and also checked for issues on **Travis CI**.

Commits are written in accordance with [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). This enables us to automatically release new version together with [`semantic-release`](https://github.com/semantic-release/semantic-release) on `fix` and `feat` commit types.

#### Roadmap

See the [development board](https://github.com/sQVe/30s/projects/1) for a detailed development roadmap. Below are a short outline of important improvements:

- Autocomplete with `omelette`
- Display relevant tags
- Replace `commander` with basic `yargs` and own logic

## Thanks

Many thanks to the core team and all the contributers at [`30-seconds-of-code`](https://github.com/Chalarangelo/30-seconds-of-code) for creating an awesome curated collection of snippets.

## License

```
Creative Commons License
CC0 1.0 Universal
```
