export const any = (arr, fn = Boolean) => arr.some(fn);
export const head = arr => arr[0];
export const is = (type, val) =>
  ![, null].includes(val) && val.constructor === type; // eslint-disable-line no-sparse-arrays
export const last = arr => arr[arr.length - 1];
export const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {});
export const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {}); // eslint-disable-line no-return-assign, no-sequences

export const startsOrEndsWith = (val, query) =>
  val.startsWith(query) || val.endsWith(query);
export const enforceSingleNewLine = x =>
  is(String, x) ? x.replace(/[\r\n]+/g, '\n').replace(/[\r\n]*$/, '') : x;

export function sortBy(key) {
  return (a, b) => {
    if (a[key] === b[key]) return 0;
    return a[key] < b[key] ? 1 : -1;
  };
}
