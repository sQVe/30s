#!/usr/bin/env bash

#  ╻ ╻┏━┓╺┳┓┏━┓╺┳╸┏━╸
#  ┃ ┃┣━┛ ┃┃┣━┫ ┃ ┣╸
#  ┗━┛╹  ╺┻┛╹ ╹ ╹ ┗━╸

# Exit on error.
set -o errexit

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

get_snippets_sha() {
  sha256sum dist/snippets.json | awk '{print $1}'
}

check_submodules_changes() {
  local snippetsSha

  git checkout master
  git submodule foreach git pull origin master

  if [[ $(git status --short | wc -l) -eq 0 ]]; then
    echo "Clean working status after pulling all submodules, exiting..."
    exit 0
  fi

  snippetsSha=$(get_snippets_sha)
  npm run build

  if [[ $snippetsSha == $(get_snippets_sha) ]]; then
    echo "No changes in built snippets.json, exiting..."
    exit 0
  fi
}

commit_changes() {
  echo "Committing to master branch..."
  git add .

  if [[ $TRAVIS_EVENT_TYPE == "cron" ]]; then
    git commit --message "fix(submodules): update snippets (cron build: $TRAVIS_BUILD_NUMBER)"
  else
    git commit --message "fix(submodules): update snippets (build: $TRAVIS_BUILD_NUMBER)"
  fi
}

push_changes() {
  echo "Pushing to master branch..."
  git push --force --quiet "https://${GH_TOKEN}@github.com/sQVe/30s.git" master > /dev/null 2>&1
}

# Ensure master branch and a not pull request event.
if [[
  $TRAVIS_BRANCH == "master" &&
  $TRAVIS_EVENT_TYPE != "pull_request"
]]; then
  setup_git
  check_submodules_changes
  commit_changes
  push_changes
fi

