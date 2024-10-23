;(function() {
  var undefined;

  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  var root = freeGlobal || freeSelf || Function('return this')();

  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  var _ = root._ || {};

  /*----------------------------------------------------------------------------*/

  var templates = {};

  /*----------------------------------------------------------------------------*/

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    define(['lodash'], function(lodash) {
      _ = lodash;
      lodash.templates = lodash.extend(lodash.templates || {}, templates);
    });
  }
  else if (freeModule) {
    _ = require('lodash');
    (freeModule.exports = templates).templates = templates;
    freeExports.templates = templates;
  }
  else if (_) {
    _.templates = _.extend(_.templates || {}, templates);
  }
}.call(this));
