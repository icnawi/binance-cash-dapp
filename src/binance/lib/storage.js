export class JsStorage {
  constructor() {
    this.db = {};
  }

  get(key) {
    return this.db[key];
  }

  getOrElement(key, defaultElement) {
    const element = this.db[key];
    if (element === undefined) {
      return defaultElement;
    }

    return element;
  }

  put(key, value) {
    if (key === undefined || value === undefined) {
      throw Error('key or value is undefined');
    }
    this.db[key] = value;
  }

  del(key) {
    delete this.db[key];
  }

  putBatch(keyValues) {
    keyValues.forEach(element => {
      this.db[element.key] = element.value;
    });
  }
}
