/*jslint maxlen:80, es6:true, this:true, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:true, plusplus:true, maxparams:2, maxdepth:2,
  maxstatements:14, maxcomplexity:5 */

/*global JSON:true, module, require, describe, it, expect, returnExports,
  alert */

(function () {
  'use strict';

  var lib;
  if (typeof module === 'object' && module.exports) {
    require('es5-shim');
    require('es5-shim/es5-sham');
    if (typeof JSON === 'undefined') {
      JSON = {};
    }
    require('json3').runInContext(null, JSON);
    require('es6-shim');
    lib = require('../../index.js');
  } else {
    lib = returnExports;
  }

  describe('is-x', function () {
    var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

    it('basic', function () {
      var values = [
        lib.isNil,
        lib.isNull,
        lib.isUndefined,
        lib.isEqual,
        lib.isStrictEqual,
        lib.isGt,
        lib.isGte,
        lib.isLt,
        lib.isLte,
        lib.isArguments,
        lib.isString,
        lib.isBoolean,
        lib.isNumber,
        lib.isDate,
        lib.isNaN,
        lib.isFinite,
        lib.isSymbol,
        lib.isTypedArray,
        lib.isPrimitive,
        lib.isPlainObject,
        lib.isCallable,
        lib.isConstructor,
        lib.isFunction,
        lib.isRegExp,
        lib.isObject,
        lib.isObjectLike,
        lib.isStringTag,
        lib.isArray,
        lib.isArrayLike,
        lib.isProtoOf,
        lib.isFrozen,
        lib.isSealed,
        lib.is,
        lib.isSameValueZero,
        lib.isExtensible,
        lib.isInteger,
        lib.isSafeInteger,
        lib.isPropertyKey,
        lib.isLength,
        lib.isIndex,
        lib.isNative,
        lib.isDeepEqual,
        lib.isStrictDeepEqual,
        lib.isTypeOf,
        lib.isBuffer,
        lib.isArrayBuffer,
        lib.isDataView,
        lib.isOwnPropertyOf,
        lib.isPropertyOf,
        lib.isSurrogatePair,
        lib.isArrowFunction,
        lib.isError,
        lib.isMap,
        lib.isSet
      ];

      values.forEach(function (value, index) {
          expect(typeof value).toBe('function', index);
        });
    });

    describe('isEqual', function () {
      it('should return correct boolean in each case', function () {
        expect(lib.isEqual(-1, '-1')).toBe(true);
        expect(lib.isEqual(0, '0')).toBe(true);
        expect(lib.isEqual(1, '1')).toBe(true);
        expect(lib.isEqual(Infinity, 'Infinity')).toBe(true);
        expect(lib.isEqual(-Infinity, '-Infinity')).toBe(true);
        expect(lib.isEqual(NaN, NaN)).toBe(false);
        expect(lib.isEqual(NaN, 'NaN')).toBe(false);
        expect(lib.isEqual(-1, -1)).toBe(true);
        expect(lib.isEqual(0, 0)).toBe(true);
        expect(lib.isEqual(1, 1)).toBe(true);
        expect(lib.isEqual(Infinity, Infinity)).toBe(true);
        expect(lib.isEqual(-Infinity, -Infinity)).toBe(true);
        expect(lib.isEqual(1, 2)).toBe(false);
      });
    });

    describe('isStrictEqual', function () {
      it('should return correct boolean in each case', function () {
        expect(lib.isStrictEqual(-1, '-1')).toBe(false);
        expect(lib.isStrictEqual(0, '0')).toBe(false);
        expect(lib.isStrictEqual(1, '1')).toBe(false);
        expect(lib.isStrictEqual(Infinity, 'Infinity')).toBe(false);
        expect(lib.isStrictEqual(-Infinity, '-Infinity')).toBe(false);
        expect(lib.isStrictEqual(NaN, NaN)).toBe(false);
        expect(lib.isStrictEqual(NaN, 'NaN')).toBe(false);
        expect(lib.isStrictEqual(-1, -1)).toBe(true);
        expect(lib.isStrictEqual(0, 0)).toBe(true);
        expect(lib.isStrictEqual(1, 1)).toBe(true);
        expect(lib.isStrictEqual(Infinity, Infinity)).toBe(true);
        expect(lib.isStrictEqual(-Infinity, -Infinity)).toBe(true);
        expect(lib.isStrictEqual(1, 2)).toBe(false);
      });
    });

    describe('isGt', function () {
      it('should return correct boolean in each case', function () {
        expect(lib.isGt(1, 0)).toBe(true);
        expect(lib.isGt(1, 1)).toBe(false);
        expect(lib.isGt(1, 2)).toBe(false);
        expect(lib.isGt(0, 0)).toBe(false);
        expect(lib.isGt(0, +0)).toBe(false);
        expect(lib.isGt(0, -0)).toBe(false);
      });
    });

    describe('isGte', function () {
      it('should return correct boolean in each case', function () {
        expect(lib.isGte(1, 0)).toBe(true);
        expect(lib.isGte(1, 1)).toBe(true);
        expect(lib.isGte(1, 2)).toBe(false);
        expect(lib.isGte(0, 0)).toBe(true);
        expect(lib.isGte(0, +0)).toBe(true);
        expect(lib.isGte(0, -0)).toBe(true);
      });
    });

    describe('isLt', function () {
      it('should return correct boolean in each case', function () {
        expect(lib.isLt(1, 2)).toBe(true);
        expect(lib.isLt(1, 1)).toBe(false);
        expect(lib.isLt(1, 0)).toBe(false);
        expect(lib.isLt(0, 0)).toBe(false);
        expect(lib.isLt(0, +0)).toBe(false);
        expect(lib.isLt(0, -0)).toBe(false);
      });
    });

    describe('isLte', function () {
      it('should return correct boolean in each case', function () {
        expect(lib.isLte(1, 1)).toBe(true);
        expect(lib.isLte(1, 0)).toBe(false);
        expect(lib.isLte(1, 2)).toBe(true);
        expect(lib.isLte(0, 0)).toBe(true);
        expect(lib.isLte(0, +0)).toBe(true);
        expect(lib.isLte(0, -0)).toBe(true);
      });
    });

    describe('isObject', function () {
      it('should return false when primitive value', function () {
        expect(lib.isObject(null)).toBe(false);
        expect(lib.isObject(undefined)).toBe(false);
        expect(lib.isObject(1)).toBe(false);
        expect(lib.isObject('foo')).toBe(false);
        expect(lib.isObject(true)).toBe(false);
        expect(lib.isObject(false)).toBe(false);
        expect(lib.isObject(NaN)).toBe(false);
        expect(lib.isObject(Infinity)).toBe(false);
        if (typeof Symbol === 'function') {
          expect(lib.isObject(Symbol())).toBe(false);
        }
      });

      it('should return true when an object value', function () {
        function Ctr() {}
        expect(lib.isObject({})).toBe(true);
        expect(lib.isObject([])).toBe(true);
        expect(lib.isObject(/./)).toBe(true);
        expect(lib.isObject(Ctr)).toBe(true);
        expect(lib.isObject(new Ctr())).toBe(true);
        expect(lib.isObject(Object(1))).toBe(true);
        expect(lib.isObject(Object(''))).toBe(true);
        expect(lib.isObject(Object(false))).toBe(true);
        expect(lib.isObject(new Date())).toBe(true);
        expect(lib.isObject(new Error())).toBe(true);
      });
    });

    describe('isStringTag', function () {
      it('should be true in each case', function () {
        expect(lib.isStringTag(undefined, '[object Undefined]')).toBe(true);
        expect(lib.isStringTag(null, '[object Null]')).toBe(true);
        expect(lib.isStringTag(1, '[object Number]')).toBe(true);
        expect(lib.isStringTag(true, '[object Boolean]')).toBe(true);
        expect(lib.isStringTag('x', '[object String]')).toBe(true);
        expect(lib.isStringTag([1, 2, 3], '[object Array]')).toBe(true);
        expect(lib.isStringTag({}, '[object Object]')).toBe(true);
        expect(lib.isStringTag(function () {}, '[object Function]')).toBe(true);
      });
    });

    describe('isTypeOf', function () {
      it('should return `true`', function () {
        expect(lib.isTypeOf(undefined, 'undefined')).toBe(true);
        expect(lib.isTypeOf(null, 'object')).toBe(true);
        expect(lib.isTypeOf(1, 'number')).toBe(true);
        expect(lib.isTypeOf(true, 'boolean')).toBe(true);
        expect(lib.isTypeOf('', 'string')).toBe(true);
        expect(lib.isTypeOf(function () {}, 'function')).toBe(true);
      });
    });

    describe('isSafeInteger', function () {
      it('should return `true` for integer values', function () {
        var values = [-MAX_SAFE_INTEGER, -1, 0, 1, MAX_SAFE_INTEGER],
          expected = values.map(function () {
            return true;
          });

        var actual = values.map(lib.isSafeInteger);

        expect(actual).toEqual(expected);
      });

      it('should return `false` for non-integer number values', function () {
        var values = [NaN, Infinity, -Infinity, Object(1), 3.14],
          expected = values.map(function () {
            return false;
          });

        var actual = values.map(lib.isSafeInteger);

        expect(actual).toEqual(expected);
      });

      it('should return `false` for non-numeric values', function () {
        /*jshint elision:true */
        var falsey = [, '', 0, false, NaN, null, undefined];
        /*jshint elision:false */
        var expected = falsey.map(function (value) {
          return value === 0;
        });

        var actual = falsey.map(function (value, index) {
          return index ? lib.isSafeInteger(value) : lib.isSafeInteger();
        });

        expect(actual).toEqual(expected);

        expect(lib.isSafeInteger(arguments)).toBe(false);
        expect(lib.isSafeInteger([1, 2, 3])).toBe(false);
        expect(lib.isSafeInteger(true)).toBe(false);
        expect(lib.isSafeInteger(new Date())).toBe(false);
        expect(lib.isSafeInteger(new Error())).toBe(false);
        expect(lib.isSafeInteger({ 'a': 1 })).toBe(false);
        expect(lib.isSafeInteger(/x/)).toBe(false);
        expect(lib.isSafeInteger('a')).toBe(false);
      });
    });

    describe('isIndex', function () {
      it('should return `true` for indexes', function () {
        var values = [-0, 0, '0', '1', 3, MAX_SAFE_INTEGER - 1],
          expected = values.map(function () {
            return true;
          });

        var actual = values.map(lib.isIndex);

        expect(actual).toEqual(expected);
      });

      it('should return `false` for non-indexes', function () {
        var values = ['0x1', '02', '-0', '-1', -3, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER],
          expected = values.map(function () {
            return false;
          });

        var actual = values.map(lib.isIndex);

        expect(actual).toEqual(expected);
      });
    });

    describe('isNative', function () {
      it('should negatively validate', function () {
        var values = [
          'beep',
          5,
          NaN,
          true,
          null,
          undefined,
          [],
          {},
          function () {},
          function beep() {}
        ];

        values.forEach(function (value, index) {
          expect(lib.isNative(value)).toBe(false, index);
        });
      });

      it('should positively validate', function () {
        var values = [
          Math.sqrt,
          Object.prototype.toString,
          Array,
          Boolean,
          String,
          Math.pow,
          Function,
          eval
        ];

        if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer) {
          values.push(ArrayBuffer);
          if (typeof Int16Array !== 'undefined' && Int16Array) {
            values.push(Int16Array);
          }
        }

        if (typeof alert !== 'undefined' && alert) {
          values.push(alert);
        }

        values.forEach(function (value, index) {
          expect(lib.isNative(value)).toBe(true, index);
        });
      });
    });
  });
}());
