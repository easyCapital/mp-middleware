function ArrayToObject(array: any[], key: string = 'id') {
  return array.reduce((obj, item) => {
    obj[item[key]] = item;
    return obj;
  }, {});
}

export default ArrayToObject;
