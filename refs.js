/**
 * Class with parse and get methods for multi-storage refs syntax.
 * 
 * @namespace
 * @param {Object.<string, *>} storages
 * @param {Object.<string, Refs~getter>} getters
 * @description `import { Refs } from 'ancient-refs';`
 */
var Refs = function(storages, getters) {
  this.storages = storages;
  this.getters = getters;
};

/**
 * @memberof Refs
 * @param {String} storage
 * @param {String} id
 * @return {String} ref
 * @description `refs.generate('items', 'abc'); // 'items/abc'`
 * @throws StorageName must be a string!
 * @throws Id must be a string!
 */
Refs.prototype.generate = function(storageName, id) {
  if (typeof(storageName) != 'string') {
    throw new Error('StorageName must be a string!');
  }
  if (typeof(id) != 'string') {
    throw new Error('Id must be a string!');
  }
  return storageName+'/'+id;
};

/**
 * @memberof Refs
 * @param {String} ref
 * @return {String[]|undefined} [_ref]
 * @description `refs.parse('items/abc'); // ['items','abc']`
 */
Refs.prototype.parse = function(id) {
  if (typeof(id) != 'string') {
    return undefined;
  }
  return id.split('/');
};

/**
 * @memberof Refs
 * @param {String} ref
 * @param {Refs~callback} [callback]
 * @return {Object|undefined} [document]
 * @description `refs.get('items/abc'); // 123`
 */
Refs.prototype.get = function(ref, callback) {
  var _ref = this.parse(ref);
  if (!_ref) return undefined;
  return this.getters[_ref[0]](_ref[1], callback);
};

/**
 * @memberof Refs
 * @param {String} ref
 * @return {*} [storage]
 */
Refs.prototype.storage = function(ref) {
  var _ref = this.parse(ref);
  if (!_ref) return undefined;
  return this.storages[_ref[0]];
};

Refs.prototype.collection = Refs.prototype.storage;

/**
 * @memberof Refs
 * @param {String} ref
 * @return {String} id
 */
Refs.prototype.id = function(ref) {
  var _ref = this.parse(ref);
  if (!_ref) return undefined;
  return _ref&&_ref[1]?_ref[1]:undefined;
};

/**
 * Callback from get method.
 *
 * @callback Refs~callback
 * @param {Error} [error]
 * @param {*} [data]
 */

/**
 * Adapter for get data from storage by id.
 *
 * @callback Refs~getter
 * @param {String} id
 * @param {Refs~callback} [callback]
 * @return {*} [data]
 */

exports.Refs = Refs;