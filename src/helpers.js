const any = (arr, fn = Boolean) => arr.some(fn);
const is = (type, val) => ![, null].includes(val) && val.constructor === type; // eslint-disable-line no-sparse-arrays
const last = arr => arr[arr.length - 1];
const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {});
const startsOrEndsWith = (val, query) =>
  val.startsWith(query) || val.endsWith(query);

const enforceSingleNewLine = x =>
  is(String, x) ? x.replace(/[\r\n]+/g, '\n').replace(/[\r\n]*$/, '') : x;

function sortBy(key) {
  return (a, b) => {
    if (a[key] === b[key]) return 0;
    return a[key] < b[key] ? 1 : -1;
  };
}

module.exports = {
  any,
  enforceSingleNewLine,
  is,
  last,
  mapValues,
  sortBy,
  startsOrEndsWith,
};
