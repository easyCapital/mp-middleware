function getNumberOrString(value: string): string | number {
  if (value.match(/"(\S+)"/g)) {
    return value.replace(/"/g, '').toString();
  }

  return Number(value);
}

export default getNumberOrString;
