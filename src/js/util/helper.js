export function isType(value, type) {
  Object.prototype.toString.call(value).match(/[A-Z]\w+/)[0].toLowerCase() === type;
}
