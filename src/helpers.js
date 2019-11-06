import { anyPass, compose, endsWith, is, replace, startsWith } from 'ramda'

export const enforceSingleNewLine = x =>
  is(String, x)
    ? compose(
        replace(/[\r\n]+/g, '\n'),
        replace(/[\r\n]*$/, '')
      )(x)
    : x

export const randomNumberInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const startsOrEndsWith = (val, query) =>
  anyPass([startsWith, endsWith])(query, val)
