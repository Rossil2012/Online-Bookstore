class Global {
  static Map map = new Map();

  static put(key, value) {
    map[key] = value;
  }

  static get(key) {
    return map.containsKey(key) ? map[key] : null;
  }
}