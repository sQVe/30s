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

commit_changes() {
  git checkout master

  if [[ $(git status --short | wc -l) -eq 0 ]]; then
    echo "Clean working status on master branch, exiting..."
    exit 0;
  else
    echo "Committing to master branch..."
    git add .

    if [[ $TRAVIS_EVENT_TYPE == "cron" ]]; then
      git commit --message "Travis build: $TRAVIS_BUILD_NUMBER [cron]"
    else
      git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
    fi

    echo "Patching package version..."
    npm version patch
  fi
}

push_changes() {
  echo "Pushing to master branch..."
  git push --force --quiet "https://${GH_TOKEN}@github.com/sQVe/30-seconds-of-code-cli.git" master > /dev/null 2>&1
}


if [[ $TRAVIS_BRANCH == "master" && $TRAVIS_EVENT_TYPE != "pull_request" ]]; then
  setup_git
  commit_changes
  push_changes
fi
