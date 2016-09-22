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
 */
Refs.prototype.generate = function(storageName, id) {
  return storageName+'/'+id;
};

/**
 * @memberof Refs
 * @param {String} ref
 * @return {String[]} _ref
 * @description `refs.parse('items/abc'); // ['items','abc']`
 */
Refs.prototype.parse = function(id) {
  return id.split('/');
};

/**
 * @memberof Refs
 * @param {String} ref
 * @param {Refs~callback} [callback]
 * @description `refs.get('items/abc'); // 123`
 */
Refs.prototype.get = function(ref, callback) {
  var _ref = this.parse(ref);
  return this.getters[_ref[0]](_ref[1], callback);
};

/**
 * @memberof Refs
 * @param {String} ref
 * @return {*} storage
 */
Refs.prototype.storage = function(ref) {
  var _ref = this.parse(ref);
  return this.storages[_ref[0]];
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