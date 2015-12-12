/*jslint maxlen:80, es6:true, this:true, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:true, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:7, maxcomplexity:2 */

/*global module, require, describe, it, expect, returnExports */

(function () {
  'use strict';

  var lib;
  if (typeof module === 'object' && module.exports) {
    require('es5-shim');
    require('es5-shim/es5-sham.js');
    lib = require('../../index.js');
  } else {
    lib = returnExports;
  }

  describe('is-x', function () {
    it('basic', function () {
    });
  });
}());
