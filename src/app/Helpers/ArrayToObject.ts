function ArrayToObject(array: any[], key = 'id'): Record<string, any> {
  return array.reduce((obj, item) => {
    obj[item[key]] = item;
    return obj;
  }, {});
}

export default ArrayToObject;
