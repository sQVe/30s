import { anyPass, startsWith, endsWith, is, compose, replace } from 'ramda';

export const startsOrEndsWith = (val, query) =>
  anyPass([startsWith, endsWith])(query, val);
export const enforceSingleNewLine = x =>
  is(String, x)
    ? compose(
        replace(/[\r\n]+/g, '\n'),
        replace(/[\r\n]*$/, '')
      )(x)
    : x;
