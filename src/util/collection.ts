type Collection = string | Array<any>;

export function first(value: Collection) {
  return value[0];
}

export function last(value: Collection) {
  return value[value.length - 1];
}

export function isEmpty(value: Collection) {
  return !value.length;
}
