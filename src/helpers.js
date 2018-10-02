const any = (arr, fn = Boolean) => arr.some(fn);
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
const isString = val => typeof val === 'string';
const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {});
const startsOrEndsWith = (val, query) =>
  val.startsWith(query) || val.endsWith(query);

const enforceSingleNewLine = x =>
  isString(x) ? x.replace(/[\r\n]+/g, '\n').replace(/[\r\n]*$/, '') : x;

function sortBy(key) {
  return (a, b) => {
    if (a[key] === b[key]) return 0;
    return a[key] < b[key] ? 1 : -1;
  };
}

module.exports = {
  any,
  compose,
  enforceSingleNewLine,
  isString,
  mapValues,
  sortBy,
  startsOrEndsWith,
};
