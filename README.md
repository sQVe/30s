# 30s

_A command-line application for [30 seconds of code](https://github.com/30-seconds/30-seconds-of-code/) snippets._

[![license](https://img.shields.io/badge/license-CC0--1.0-blue.svg)](https://github.com/sQVe/30s/blob/develop/LICENSE) [![build status](https://travis-ci.org/sQVe/30s.svg?branch=master)](https://travis-ci.org/sQVe/30s) [![coveralls](https://coveralls.io/repos/github/sQVe/30s/badge.svg?branch=master)](https://coveralls.io/github/sQVe/30s?branch=master) [![greenkeeper](https://badges.greenkeeper.io/sQVe/30s.svg)](https://greenkeeper.io/)

![Demo](/.github/demo.gif?raw=true)

<hr>

## Features

- Written in JavaScript (ES6)
- View, view by tag and search snippets
- Only show what you find necessary by picking a layout
- Colorful output or JSON
- Copy all code blocks to clipboard
- Automatically updates with new snippet changes
- Works on Mac, Linux and (maybe) Windows

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
$ ./dist/cli.sh <command> <query>
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

PRs are more than welcome. Do the following to start helping out:

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Run `npm install` in the created directory to install all necessary dependencies.

Optional steps:

3. Uninstall `30s` if it's already installed: `npm uninstall -g 30s`
4. Link it to the global module directory: `npm link`

#### Roadmap

See the [development board](https://github.com/sQVe/30s/projects/1) for a detailed development roadmap. Below are a short outline of important improvements:

- Replace most helper logic by using `Ramda`
- Replace `commander` with basic `yargs` and own logic
- Autocomplete with `omelette`

## Thanks

Many thanks to the core team and all the contributers at [30-seconds-of-code](https://github.com/Chalarangelo/30-seconds-of-code) for creating an awesome curated collection of snippets.

## License

```
Creative Commons License
CC0 1.0 Universal
```
