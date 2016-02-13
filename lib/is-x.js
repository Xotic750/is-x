(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.returnExports = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/is-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * A collection of the best JavaScript type testing methods.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.11
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @see https://github.com/Xotic750/is-x
 * @module is-x
 */

/*jslint maxlen:80, es6:true, this:true, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:true, plusplus:true, maxparams:4, maxdepth:2,
  maxstatements:19, maxcomplexity:11 */

/*global require, module */

;(function () {
  'use strict';

  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1,
    ES = _dereq_('es-abstract/es6'),
    define = _dereq_('define-properties-x'),
    hasOwnProperty = _dereq_('has-own-property-x'),
    toStringTag = _dereq_('to-string-tag-x'),
    isPrimitive = _dereq_('is-primitive'),
    isNil = _dereq_('is-nil-x'),
    isNativeLD = _dereq_('lodash.isnative'),
    deepEqual = _dereq_('deep-equal-x'),
    getFunctionName = _dereq_('get-function-name-x'),
    s = _dereq_('white-space-x').ws,
    pIsPrototypeOf = Object.prototype.isPrototypeOf,
    fToString = Function.prototype.toString,
    sReplace = String.prototype.replace,
    sMatch = String.prototype.match,
    reIsUint = /^(?:0|[1-9]\d*)$/,
    FN_STAR = [
      new RegExp('^[' + s + ']*function[' + s + ']*(\\*?)[' + s + ']+', 'i')
    ],
    STRIP_COMMENTS = [/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, ' '];

  function isSafeInteger(value) {
    return ES.IsInteger(value) &&
      value >= -MAX_SAFE_INTEGER &&
      value <= MAX_SAFE_INTEGER;
  }

  define.properties(module.exports, {
    /**
     * Checks if `value` is `null` or `undefined`.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is nullish, else `false`.
     */
    isNil: isNil,
    /**
     * Checks if `value` is `null`.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is `null`, else `false`.
     */
    isNull: _dereq_('lodash.isnull'),
    /**
     * Checks if `value` is `undefined`.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is `undefined`, else `false`.
     */
    isUndefined: _dereq_('validate.io-undefined'),
    /**
     * Checks if `value1` is `value2` using == equality.
     *
     * @function
     * @param {*} value1 The first value to check.
     * @param {*} value2 The second value to check.
     * @return {boolean} Returns `true` if `value1` == `value2`, else `false`.
     */
    isEqual: function isEqual(value1, value2) {
      /*jshint eqeqeq:false */
      return value1 == value2;
    },
    /**
     * Checks if `value1` is `value2` using === equality.
     *
     * @function
     * @param {*} value1 The first value to check.
     * @param {*} value2 The second value to check.
     * @return {boolean} Returns `true` if `value1` === `value2`, else `false`.
     */
    isStrictEqual: function isStrictEqual(value1, value2) {
      return value1 === value2;
    },
    /**
     * Checks if `value1` is greater than `value2`.
     *
     * @function
     * @param {*} value1 The first value to check.
     * @param {*} value2 The second value to check.
     * @return {boolean} Returns `true` if `value1` > `value2`, else `false`.
     */
    isGt: function isGt(value1, value2) {
      return value1 > value2;
    },
    /**
     * Checks if `value1` is greater than or equal to `value2`.
     *
     * @function
     * @param {*} value1 The first value to check.
     * @param {*} value2 The second value to check.
     * @return {boolean} Returns `true` if `value1` >= `value2`, else `false`.
     */
    isGte: function isGt(value1, value2) {
      return value1 >= value2;
    },
    /**
     * Checks if `value1` is less than `value2`.
     *
     * @function
     * @param {*} value1 The first value to check.
     * @param {*} value2 The second value to check.
     * @return {boolean} Returns `true` if `value1` < `value2`, else `false`.
     */
    isLt: function isLt(value1, value2) {
      return value1 < value2;
    },
    /**
     * Checks if `value1` is less than or equal to `value2`.
     *
     * @function
     * @param {*} value1 The first value to check.
     * @param {*} value2 The second value to check.
     * @return {boolean} Returns `true` if `value1` <= `value2`, else `false`.
     */
    isLte: function isLt(value1, value2) {
      return value1 <= value2;
    },
    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     */
    isArguments: _dereq_('is-arguments'),
    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     */
    isString: _dereq_('is-string'),
    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a boolean, else `false`.
     */
    isBoolean: _dereq_('is-boolean-object'),
    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     */
    isNumber: _dereq_('is-number-object'),
    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a Date object,
     *  else `false`.
     */
    isDate: _dereq_('is-date-object'),
    /**
     * Checks if `value` is `NaN`.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is `NaN`, else `false`.
     */
    isNaN: Number.isNaN,
    /**
     * Checks if `value` is a finite primitive number.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a finite number,
     *  else `false`.
     */
    isFinite: Number.isFinite,
    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     */
    isSymbol: _dereq_('is-symbol'),
    /**
     * Checks if `value` is classified as a typed array.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     */
    isTypedArray: _dereq_('is-typed-array'),
    /**
     * Checks if `value` is a primitive.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a primitive,
     *  else `false`.
     */
    isPrimitive: isPrimitive,
    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @function
     * @return {boolean} Returns `true` if `value` is a plain object,
     *  else `false`.
     */
    isPlainObject: _dereq_('lodash.isplainobject'),
    /**
     * Checks if `value` is a 'Function`.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a `Function`,
     *  else `false`.
     */
    isCallable: ES.IsCallable,
    /**
     * Checks if `value` is a 'constructor`.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a `constructor`,
     *  else `false`.
     */
    isConstructor: ES.IsConstructor,
    /**
     * Checks if `value` is callable.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is callable, else `false`.
     */
    isFunction: _dereq_('is-function-x'),
    /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     */
    isRegExp: ES.IsRegExp,
    /**
     * Checks if `value` is not a primitive.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is an object, else `false`.
     */
    isObject: function isObject(value) {
      return !isPrimitive(value);
    },
    /**
     * Checks if `value` is object-like. A value is object-like if it's not a
     * primitive and not a function.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is object-like,
     *  else `false`.
     */
    isObjectLike: _dereq_('is-object-like-x'),
    /**
     * Checks if `value`'s string tag is the supplied `stringTag`.
     *
     * @function
     * @param {*} value The value to check.
     * @param {string} stringTag The value to check.
     * @return {boolean} Returns `true` if `value`'s the string tag matches
     * `stringTag`, else `false`.
     */
    isStringTag: function isStringTag(value, stringTag) {
      return typeof stringTag === 'string' && toStringTag(value) === stringTag;
    },
    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is an `Array`, else `false`.
     */
    isArray: ES.IsArray,
    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is array-like, else `false`.
     */
    isArrayLike: _dereq_('is-array-like-x'),
    /**
     * This method allows you to check whether or not an object
     * exists within another object's prototype chain.
     *
     * @function
     * @param {*} prototypeObj An object to be tested against each link in the
     *  prototype chain of the object argument.
     * @param {*} object The object whose prototype chain will be searched.
     * @return {boolean} Returns `true` if `prototypeObj` is in `object`'s
     *  prototype chain, else `false`.
     */
    isProtoOf: function isProtoOf(prototypeObj, object) {
      if (isNil(prototypeObj) || isNil(object)) {
        return false;
      }
      return ES.Call(pIsPrototypeOf, prototypeObj, [object]);
    },
    /**
     * An object is frozen if and only if it is not extensible, all its
     * properties are non-configurable, and all its data properties
     * (that is, properties which are not accessor properties with getter
     * or setter components) are non-writable.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is frozen, else `false`.
     */
    isFrozen: Object.isFrozen,
    /**
     * Returns true if the object is sealed, otherwise false. An object is
     * sealed if it is not extensible and if all its properties are
     * non-configurable and therefore not removable
     * (but not necessarily non-writable).
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is sealed, else `false`.
     */
    isSealed: Object.isSealed,
    /**
     * This method determines whether two values are the same value. Two values
     * are the same if one of the following holds:
     * - both undefined
     * - both null
     * - both true or both false
     * - both strings of the same length with the same characters
     * - both the same object
     * - both numbers and
     * - both +0
     * - both -0
     * - both NaN
     * - both non-zero and both not NaN and both have the same value
     * This is not the same as being equal according to the == operator.
     * The == operator applies various coercions to both sides (if they are
     * not the same Type) before testing for equality (resulting in such
     * behavior as "" == false being true), but Object.is doesn't coerce
     * either value.
     *
     * @function
     * @param {*} value1 The first value to compare.
     * @param {*} value2 The second value to compare.
     * @return {boolean} `true` if the two values are the same value, else
     *  `false`.
     */
    is: ES.SameValue,
    /**
     * This method determines whether two values are the same value. Two values
     * are the same if one of the following holds:
     * - both undefined
     * - both null
     * - both true or both false
     * - both strings of the same length with the same characters
     * - both the same object
     * - both numbers and
     * - both 0 regardless of sign
     * - both NaN
     * - both non-zero and both not NaN and both have the same value
     * This is not the same as being equal according to the == operator.
     * The == operator applies various coercions to both sides (if they are
     * not the same Type) before testing for equality (resulting in such
     * behavior as "" == false being true), but `is` doesn't coerce
     * either value.
     *
     * `isSameValueZero` differs from `is` only in its treatment of +0 and -0.
     *
     * @function
     * @param {*} value1 The first value to compare.
     * @param {*} value2 The second value to compare.
     * @return {boolean} `true` if the two values are the same value, else
     *  `false`.
     */
    isSameValueZero: ES.SameValueZero,
    /**
     * Determines if an object is `-0`.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is `-0`, else `false`.
     */
    isNegativeZero: function isNegativeZero(value) {
      return ES.SameValue(value, -0);
    },
    /**
     * Determines if an object is extensible (whether it can have new
     * properties added to it).
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is extensible, else `false`.
     */
    isExtensible: ES.IsExtensible,
    /**
     * Checks if `value` is an integer.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is an integer, else `false`.
     */
    isInteger: ES.IsInteger,
    /**
     * Checks if `value` is a safe integer. An integer is safe if it's
     * an IEEE-754 double precision number which isn't the result of a rounded
     * unsafe integer.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a safe integer,
     *  else `false`.
     */
    isSafeInteger: isSafeInteger,
    /**
     * The abstract operation IsPropertyKey determines if argument, which must
     * be an ECMAScript language value or a Completion Record, is a value that
     * may be used as a property key.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a property key,
     *  else `false`.
     */
    isPropertyKey: ES.IsPropertyKey,
    /**
     * Checks if `value` is a valid array-like length.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a valid length,
     *  else `false`.
     */
    isLength: _dereq_('lodash.islength'),
    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a valid index,
     *  else `false`.
     */
    isIndex: function isIndex(value) {
      var val;
      if (typeof value === 'number' || reIsUint.test(value)) {
        val = ES.ToNumber(value);
      }
      return ES.IsInteger(val) && val >= 0 && val < MAX_SAFE_INTEGER;
    },
    /**
     * Checks if `value` is a native function.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    isNative: isNativeLD,
    /**
     * Tests for deep equality. Primitive values are compared with the equal
     * comparison operator ( == ). This only considers enumerable properties.
     * It does not test object prototypes, attached symbols, or non-enumerable
     * properties. This can lead to some potentially surprising results
     *
     * @param {*} value1 First comparison object.
     * @param {*} value2 Second comparison object.
     * @return {boolean} `true` if `actual` and `expected` are deemed equal,
     *  otherwise `false`. Circular objects will return `false`.
     * @see https://nodejs.org/api/assert.html
     */
    isDeepEqual: function isDeepEqual(value1, value2) {
      try {
        return deepEqual(value1, value2);
      } catch (ignore) {}
      return false;
    },
    /**
     * Tests for deep equality. Primitive values are compared with the equal
     * comparison operator ( === ).
     *
     * @param {*} value1 First comparison object.
     * @param {*} value2 Second comparison object.
     * @return {boolean} `true` if `actual` and `expected` are deemed equal,
     *  otherwise `false`. Circular objects will return `false`.
     * @see https://nodejs.org/api/assert.html
     */
    isStrictDeepEqual: function isStrictDeepEqual(value1, value2) {
      try {
        return deepEqual(value1, value2, true);
      } catch (ignore) {}
      return false;
    },
    /**
     * Checks if `value` is likely a DOM element.
     *
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a DOM element,
     *  else `false`.
     */
    isElement: _dereq_('lodash.iselement'),
    /**
     * This method returns `true` if the string indicating the type of the
     * unevaluated operand matches `typeOfString`.
     *
     * @function
     * @param {*} value The object to test.
     * @param {string} typeOfString The `typeof` string to test.
     * @return {boolean} `true` if the `typeof object` string matches
     * `typeOfString`, else false`.
     */
    isTypeOf: function isTypeOf(value, typeOfString) {
      return typeof typeOfString === 'string' && typeof value === typeOfString;
    },
    /**
     * Determine if an `object` is a node's `Buffer` class.
     *
     * @function
     * @param {*} object The object to test.
     * @return {boolean} `true` if the `object` is a `Buffer`, else false`.
     * @see https://iojs.org/api/buffer.html
     */
    isBuffer: _dereq_('is-buffer'),
    /**
     * Determine if an `object` is an `ArrayBuffer`.
     *
     * @function
     * @param {*} object The object to test.
     * @return {boolean} `true` if the `object` is an `ArrayBuffer`,
     *  else false`.
     */
    isArrayBuffer: _dereq_('is-array-buffer-x'),
    /**
     * Determine if an `object` is a `DataView`.
     *
     * @function
     * @param {*} object The object to test.
     * @return {boolean} `true` if the `object` is a `DataView`,
     *  else false`.
     */
    isDataView: _dereq_('is-data-view-x'),
    /**
     * This method returns `true` if the `object` has the specified `property`.
     *
     * @function
     * @param {*} object The object to test.
     * @param {string|Symbol} property The name or Symbol of the property to
     *  test.
     * @return {boolean} `true` if the `object` has the specified `property`,
     *  else false`.
     */
    isOwnPropertyOf: function isOwnPropertyOf(object, property) {
      return !isNil(object) &&
        ES.IsPropertyKey(property) &&
        hasOwnProperty(ES.ToObject(object), property);
    },
    /**
     * This method returns true if the specified `property` is in the specified
     * `object`.
     *
     * @function
     * @param {*} object The object to test.
     * @param {string|Symbol} property The name or Symbol of the property to
     *  test.
     * @return {boolean} `true` if the property is set on `object`, else
     *  `false`.
     */
    isPropertyOf: function isPropertyOf(object, property) {
      return !isNil(object) &&
        ES.IsPropertyKey(property) &&
        property in ES.ToObject(object);
    },
    /**
     * Tests if the two character arguments combined are a valid UTF-16
     * surrogate pair.
     *
     * @param {*} char1 The first character of a suspected surrogate pair.
     * @param {*} char2 The second character of a suspected surrogate pair.
     * @return {boolean} Returns true if the two characters create a valid
     *  UTF-16 surrogate pair; otherwise false.
     */
    isSurrogatePair: _dereq_('is-surrogate-pair-x'),
    /**
     * Determine if an `object` is an `Arrow Function`.
     *
     * @function
     * @param {*} object The object to test.
     * @return {boolean} `true` if the `object` is an `Arrow Function`,
     *  else false`.
     */
    isArrowFunction: _dereq_('is-arrow-function'),
    /**
     * Determine whether or not a given `value` is an `Error` type.
     *
     * @function
     * @param {*} value The object to be tested.
     * @return {boolean} Returns `true` if `value` is an `Error` type,
     *  else `false`.
     */
    isError: _dereq_('is-error-x'),
    /**
     * Determine whether or not a given `value` is a `Map`.
     *
     * @function
     * @param {*} value The object to be tested.
     * @return {boolean} Returns `true` if `value` is a `Map`, else `false`.
     */
    isMap: _dereq_('is-map-x'),
    /**
     * Determine whether or not a given `value` is a `Set`.
     *
     * @function
     * @param {*} value The object to be tested.
     * @return {boolean} Returns `true` if `value` is a `Set`, else `false`.
     */
    isSet: _dereq_('is-set-x'),
    /**
     * Determine whether or not a given function is named `name`.
     *
     * @function
     * @param {Function} fn The function to be tested.
     * @param {string} name The object to be tested.
     * @return {boolean} Returns `true` if function name is a `name`,
     *  else `false`.
     */
    isFunctionName: function isFunctionName(fn, name) {
      return ES.IsCallable(fn) &&
        typeof name === 'string' &&
        getFunctionName(fn) === name;
    },
    /**
     * Determine whether or not a given function is anonymous.
     *
     * @function
     * @param {Function} fn The function to be tested.
     * @return {boolean} Returns `true` if function is anonymous, else `false`.
     */
    isAnonymous: function isAnonymous(fn) {
      return ES.IsCallable(fn) && getFunctionName(fn) === '';
    },
    /**
     * Determine whether or not a given function's arity matches `arity`.
     *
     * @function
     * @param {Function} fn The function to be tested.
     * @param {number} arity The `arity` integer to be tested.
     * @return {boolean} Returns `true` if the function's arity matched `arity`,
     *  else `false`.
     */
    isArity: function isArity(fn, arity) {
      return ES.IsCallable(fn) && isSafeInteger(arity) && fn.length === arity;
    },
    /**
     * Determine whether or not a given function is an ES6 generator function.
     *
     * @function
     * @param {Function} fn The function to be tested.
     * @return {boolean} Returns `true` if the function an ES6 generator
     * function, else `false`.
     */
    isGenerator: function isGenerator(fn) {
      var match;
      if (!ES.IsCallable(fn)) {
        return false;
      }
      match = ES.Call(
        sMatch,
        ES.Call(sReplace, ES.Call(fToString, fn), STRIP_COMMENTS),
        FN_STAR
      );
      return !!match && match[1] === '*';
    }
  });
}());

},{"deep-equal-x":2,"define-properties-x":3,"es-abstract/es6":5,"get-function-name-x":16,"has-own-property-x":17,"is-arguments":20,"is-array-buffer-x":21,"is-array-like-x":22,"is-arrow-function":23,"is-boolean-object":24,"is-buffer":25,"is-data-view-x":27,"is-date-object":28,"is-error-x":29,"is-function-x":30,"is-map-x":31,"is-nil-x":32,"is-number-object":33,"is-object-like-x":34,"is-primitive":37,"is-set-x":39,"is-string":40,"is-surrogate-pair-x":41,"is-symbol":42,"is-typed-array":43,"lodash.iselement":44,"lodash.islength":45,"lodash.isnative":46,"lodash.isnull":47,"lodash.isplainobject":48,"to-string-tag-x":52,"validate.io-undefined":53,"white-space-x":54}],2:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/deep-equal-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/deep-equal-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/deep-equal-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/deep-equal-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/deep-equal-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/deep-equal-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/deep-equal-x" title="npm version">
 * <img src="https://badge.fury.io/js/deep-equal-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * node's deepEqual and deepStrictEqual algorithm.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.2.11
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module deep-equal-x
 */

/*jslint maxlen:80, es6:false, this:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:4, maxdepth:2,
  maxstatements:45, maxcomplexity:26 */

/*global require, module */

;(function () {
  'use strict';

  var isDate = _dereq_('is-date-object');
  var isArguments = _dereq_('is-arguments');
  var isPrimitive = _dereq_('is-primitive');
  var isObject = _dereq_('is-object');
  var isBuffer = _dereq_('is-buffer');
  var isString = _dereq_('is-string');
  var isError = _dereq_('is-error-x');
  var isMap = _dereq_('is-map-x');
  var isSet = _dereq_('is-set-x');
  var isNil = _dereq_('is-nil-x');
  var isRegExp = _dereq_('is-regex');
  var pIndexOf = Array.prototype.indexOf;
  var pPush = Array.prototype.push;
  var pPop = Array.prototype.pop;
  var pSlice = Array.prototype.slice;
  var pSome = Array.prototype.some;
  var pFilter = Array.prototype.filter;
  var pSort = Array.prototype.sort;
  var pTest = RegExp.prototype.test;
  var rToString = RegExp.prototype.toString;
  var pCharAt = String.prototype.charAt;
  var pGetTime = Date.prototype.getTime;
  var $Number = Number;
  var $keys = Object.keys;
  var $getPrototypeOf = Object.getPrototypeOf;
  // Check failure of by-index access of string characters (IE < 9)
  // and failure of `0 in boxedString` (Rhino)
  var boxedString = Object('a');
  var hasBoxedStringBug = boxedString[0] !== 'a' || !(0 in boxedString);
  // Used to detect unsigned integer values.
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  var hasMapEnumerables = typeof Map === 'function' ? $keys(new Map()) : [];
  var hasSetEnumerables = typeof Set === 'function' ? $keys(new Set()) : [];
  var hasErrorEnumerables;

  try {
    throw new Error('a');
  } catch (e) {
    hasErrorEnumerables = $keys(e);
  }

  /**
   * Checks if `value` is a valid string index. Specifically for boxed string
   * bug fix and not general purpose.
   *
   * @private
   * @param {*} value The value to check.
   * @return {boolean} Returns `true` if `value` is valid index, else `false`.
   */
  function isIndex(value) {
    var num = -1;
    if (pTest.call(reIsUint, value)) {
      num = $Number(value);
    }
    return num > -1 && num % 1 === 0 && num < 4294967295;
  }

  /**
   * Get an object's key avoiding boxed string bug. Specifically for boxed
   * string bug fix and not general purpose.
   *
   * @private
   * @param {Object} object The object to get the `value` from.
   * @param {string} key The `key` reference to the `value`.
   * @param {boolean} isStr Is the object a string.
   * @param {boolean} isIdx Is the `key` a character index.
   * @return {*} Returns the `value` referenced by the `key`.
   */
  function getItem(object, key, isStr, isIdx) {
    return isStr && isIdx ? pCharAt.call(object, key) : object[key];
  }

  /**
   * Filter `keys` of unwanted Error enumerables. Specifically for Error has
   * unwanted enumerables fix and not general purpose.
   *
   * @private
   * @param {Array} keys The Error object's keys.
   * @param {Array} unwanted The unwanted keys.
   * @returns {Array} Returns the filtered keys.
   */
  function filterUnwanted(keys, unwanted) {
    return unwanted.length ? pFilter.call(keys, function (key) {
      return pIndexOf.call(unwanted, key) < 0;
    }) : keys;
  }

  /**
   * Tests for deep equality. Primitive values are compared with the equal
   * comparison operator ( == ). This only considers enumerable properties.
   * It does not test object prototypes, attached symbols, or non-enumerable
   * properties. This can lead to some potentially surprising results. If
   * `strict` is `true` then Primitive values are compared with the strict
   * equal comparison operator ( === ).
   *
   * @private
   * @param {*} actual First comparison object.
   * @param {*} expected Second comparison object.
   * @param {boolean} [strict] Comparison mode. If set to `true` use `===`.
   * @param {Object} previousStack The circular stack.
   * @return {boolean} `true` if `actual` and `expected` are deemed equal,
   *  otherwise `false`.
   */
  function baseDeepEqual(actual, expected, strict, previousStack) {
    // 7.1. All identical values are equivalent, as determined by ===.
    if (actual === expected) {
      return true;
    }
    if (isBuffer(actual) && isBuffer(expected)) {
      return actual.length === expected.length &&
        !pSome.call(actual, function (item, index) {
          return item !== expected[index];
        });
    }

    // 7.2. If the expected value is a Date object, the actual value is
    // equivalent if it is also a Date object that refers to the same time.
    if (isDate(actual) && isDate(expected)) {
      return pGetTime.call(actual) === pGetTime.call(expected);
    }

    // 7.3 If the expected value is a RegExp object, the actual value is
    // equivalent if it is also a RegExp object with the same `source` and
    // properties (`global`, `multiline`, `lastIndex`, `ignoreCase` & `sticky`).
    if (isRegExp(actual) && isRegExp(expected)) {
      return rToString.call(actual) === rToString.call(expected) &&
        actual.lastIndex === expected.lastIndex;
    }

    // 7.4. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by == or strict ===.
    if (!isObject(actual) && !isObject(expected)) {
      /*jshint eqeqeq:false */
      return strict ? actual === expected : actual == expected;
    }

    // 7.5 For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
    if (isNil(actual) || isNil(expected)) {
      return false;
    }
    /*jshint eqnull:false */
    // This only considers enumerable properties. It does not test object
    // prototypes, attached symbols, or non-enumerable properties. This can
    // lead to some potentially surprising results.
    if (strict && $getPrototypeOf(actual) !== $getPrototypeOf(expected)) {
      return false;
    }
    // if one is actual primitive, the other must be same
    if (isPrimitive(actual) || isPrimitive(expected)) {
      return actual === expected;
    }
    var ka = isArguments(actual);
    var kb = isArguments(expected);
    if (ka && !kb || !ka && kb) {
      return false;
    }
    if (ka) {
      if (ka.length !== kb.length) {
        return false;
      }
      return baseDeepEqual(
        pSlice.call(actual),
        pSlice.call(expected),
        strict,
        null
      );
    }
    ka = $keys(actual);
    kb = $keys(expected);
    // having the same number of owned properties (keys incorporates
    // hasOwnProperty)
    if (ka.length !== kb.length) {
      return false;
    }
    if (isObject(actual)) {
      if (isError(actual)) {
        ka = filterUnwanted(ka, hasErrorEnumerables);
      } else if (isMap(actual)) {
        ka = filterUnwanted(ka, hasMapEnumerables);
      } else if (isSet(actual)) {
        ka = filterUnwanted(ka, hasSetEnumerables);
      }
    }
    if (isObject(expected)) {
      if (isError(expected)) {
        kb = filterUnwanted(kb, hasErrorEnumerables);
      } else if (isMap(expected)) {
        kb = filterUnwanted(kb, hasMapEnumerables);
      } else if (isSet(expected)) {
        kb = filterUnwanted(kb, hasSetEnumerables);
      }
    }
    //the same set of keys (although not necessarily the same order),
    pSort.call(ka);
    pSort.call(kb);
    var aIsString, bIsString;
    if (hasBoxedStringBug) {
      aIsString = isString(actual);
      bIsString = isString(expected);
    }
    //~~~cheap key test
    //equivalent values for every corresponding key, and
    //~~~possibly expensive deep test
    return !pSome.call(ka, function (key, index) {
      if (key !== kb[index]) {
        return true;
      }
      var isIdx = (aIsString || bIsString) && isIndex(key);
      var stack = previousStack ? previousStack : [actual];
      var item = getItem(actual, key, aIsString, isIdx);
      var isPrim = isPrimitive(item);
      if (!isPrim) {
        if (pIndexOf.call(stack, item) > -1) {
          throw new RangeError('Circular object');
        }
        pPush.call(stack, item);
      }
      var result = !baseDeepEqual(
        item,
        getItem(expected, key, bIsString, isIdx),
        strict,
        stack
      );
      if (!isPrim) {
        pPop.call(stack);
      }
      return result;
    });
  }

  /**
   * Tests for deep equality. Primitive values are compared with the equal
   * comparison operator ( == ). This only considers enumerable properties.
   * It does not test object prototypes, attached symbols, or non-enumerable
   * properties. This can lead to some potentially surprising results. If
   * `strict` is `true` then Primitive values are compared with the strict
   * equal comparison operator ( === ).
   *
   * @param {*} actual First comparison object.
   * @param {*} expected Second comparison object.
   * @param {boolean} [strict] Comparison mode. If set to `true` use `===`.
   * @return {boolean} `true` if `actual` and `expected` are deemed equal,
   *  otherwise `false`.
   * @see https://nodejs.org/api/assert.html
   * @example
   * var deepEqual = require('deep-equal-x');
   *
   * deepEqual(Error('a'), Error('b'));
   * // => true
   * // This does not return `false` because the properties on the  Error object
   * // are non-enumerable:
   *
   * deepEqual(4, '4');
   * // => true
   *
   * deepEqual({ a: 4, b: '1' }, {  b: '1', a: 4 });
   * // => true
   *
   * deepEqual(new Date(), new Date(2000, 3, 14));
   * // => false
   *
   * deepEqual(4, '4', true);
   * // => false
   */
  module.exports = function deepEqual(actual, expected, strict) {
    return baseDeepEqual(actual, expected, strict);
  };
}());

},{"is-arguments":20,"is-buffer":25,"is-date-object":28,"is-error-x":29,"is-map-x":31,"is-nil-x":32,"is-object":36,"is-primitive":37,"is-regex":38,"is-set-x":39,"is-string":40}],3:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/define-properties-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/define-properties-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/define-properties-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/define-properties-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/define-properties-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/define-properties-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/define-properties-x" title="npm version">
 * <img src="https://badge.fury.io/js/define-properties-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * Based on the original work by Jordan Harband
 * {@link https://www.npmjs.com/package/define-properties `define-properties`}.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.1.3
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module define-properties-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:4, maxdepth:2,
  maxstatements:12, maxcomplexity:3 */

/*global module */

;(function () {
  'use strict';

  var hasSymbols = _dereq_('has-symbol-support-x');
  var isFunction = _dereq_('is-function-x');
  var isUndefined = _dereq_('validate.io-undefined');
  var pConcat = Array.prototype.concat;
  var pForEach = Array.prototype.forEach;
  var $keys = Object.keys;
  var $getOwnPropertySymbols = isFunction(Object.getOwnPropertySymbols) &&
    Object.getOwnPropertySymbols;
  var $defineProperty = isFunction(Object.defineProperty) &&
    Object.defineProperty;
  var supportsDescriptors = Boolean($defineProperty) && (function (unused) {
    var obj = {};
    try {
      $defineProperty(obj, 'x', {
        enumerable: false,
        value: obj
      });
      for (unused in obj) {
        /*jshint forin:false */
        return false;
      }
      return obj.x === obj;
    } catch (e) { /* this is IE 8. */
      return false;
    }
  })();

  /**
   * Method `property`.
   *
   * @private
   * @param {Object} object The object on which to define the property.
   * @param {string|Symbol} prop The property name.
   * @param {*} value The value of the property.
   * @param {boolean} [force=false] If `true` then set property regardless.
   */
  function property(object, prop, value, force) {
    if (prop in object && !force) {
      return;
    }
    if (supportsDescriptors) {
      $defineProperty(object, prop, {
        configurable: true,
        enumerable: false,
        value: value,
        writable: true
      });
    } else {
      object[prop] = value;
    }
  }

  /**
   * Method `properties`.
   *
   * @private
   * @param {Object} object The object on which to define the property.
   * @param {Object} map The object of properties.
   * @param {Object} [predicates] The object of property predicates.
   */
  function properties(object, map, predicates) {
    var preds = isUndefined(predicates) ? {} : predicates;
    var props = $keys(map);
    if (hasSymbols && $getOwnPropertySymbols) {
      props = pConcat.call(props, $getOwnPropertySymbols(map));
    }
    pForEach.call(props, function (name) {
      var predicate = preds[name];
      property(
        object,
        name,
        map[name],
        isFunction(predicate) && predicate()
      );
    });
  }

  properties(module.exports, {
    /**
     * Just like `properties` but for defining a single non-enumerable
     * property. Useful in environments that do not
     * support `Computed property names`. This can be done
     * with `properties`, but this method can read a little cleaner.
     *
     * @function
     * @param {Object} object The object on which to define the property.
     * @param {string|Symbol} prop The property name.
     * @param {*} value The value of the property.
     * @param {boolean} [force=false] If `true` then set property regardless.
     * @example
     * var define = require('define-properties-x');
     * var myString = 'something';
     * define.property(obj, Symbol.iterator, function () {}, true);
     * define.property(obj, myString, function () {}, true);
     */
    property: property,
    /**
     * Define multiple non-enumerable properties at once.
     * Uses `Object.defineProperty` when available; falls back to standard
     * assignment in older engines. Existing properties are not overridden.
     * Accepts a map of property names to a predicate that, when true,
     * force-overrides.
     *
     * @function
     * @param {Object} object The object on which to define the property.
     * @param {Object} map The object of properties.
     * @param {Object} [predicates] The object of property predicates.
     * @example
     * var define = require('define-properties-x');
     * define.properties({
     *   a: 1,
     *   b: 2
     * }, {
     *   a: function () { return false; },
     *   b: function () { return true; }
     * });
     */
    properties: properties,
    /**
     * Boolean indicator as to whether the environments supports descriptors
     * or not.
     *
     * @type boolean
     * @example
     * var define = require('define-properties-x');
     * define.supportsDescriptors; // true or false
     */
    supportsDescriptors: supportsDescriptors
  });
}());

},{"has-symbol-support-x":18,"is-function-x":30,"validate.io-undefined":53}],4:[function(_dereq_,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };
var $isFinite = _dereq_('./helpers/isFinite');

var sign = _dereq_('./helpers/sign');
var mod = _dereq_('./helpers/mod');

var IsCallable = _dereq_('is-callable');
var toPrimitive = _dereq_('es-to-primitive/es5');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return Boolean(value);
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
        return $isNaN(x) && $isNaN(y);
	}
};

module.exports = ES5;

},{"./helpers/isFinite":7,"./helpers/mod":9,"./helpers/sign":10,"es-to-primitive/es5":11,"is-callable":26}],5:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
var symbolToStr = hasSymbols ? Symbol.prototype.toString : toStr;

var $isNaN = Number.isNaN || function (a) { return a !== a; };
var $isFinite = _dereq_('./helpers/isFinite');
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var assign = _dereq_('./helpers/assign');
var sign = _dereq_('./helpers/sign');
var mod = _dereq_('./helpers/mod');
var isPrimitive = _dereq_('./helpers/isPrimitive');
var toPrimitive = _dereq_('es-to-primitive/es6');
var parseInteger = parseInt;
var bind = _dereq_('function-bind');
var strSlice = bind.call(Function.call, String.prototype.slice);
var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
var invalidHexLiteral = /^[\-\+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);

// whitespace from: http://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var replace = bind.call(Function.call, String.prototype.replace);
var trim = function (value) {
	return replace(value, trimRegex, '');
};

var ES5 = _dereq_('./es5');

var hasRegExpMatcher = _dereq_('is-regex');

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
var ES6 = assign(assign({}, ES5), {

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
	Call: function Call(F, V) {
		var args = arguments.length > 2 ? arguments[2] : [];
		if (!this.IsCallable(F)) {
			throw new TypeError(F + ' is not a function');
		}
		return F.apply(V, args);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
	ToPrimitive: toPrimitive,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
	// ToBoolean: ES5.ToBoolean,

	// http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
	ToNumber: function ToNumber(argument) {
		var value = isPrimitive(argument) ? argument : toPrimitive(argument, 'number');
		if (typeof value === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'string') {
			if (isBinary(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 2));
			} else if (isOctal(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 8));
			} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
				return NaN;
			} else {
				var trimmed = trim(value);
				if (trimmed !== value) {
					return this.ToNumber(trimmed);
				}
			}
		}
		return Number(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
	// ToInteger: ES5.ToNumber,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
	// ToInt32: ES5.ToInt32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
	// ToUint32: ES5.ToUint32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
	ToInt16: function ToInt16(argument) {
		var int16bit = this.ToUint16(argument);
		return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
	// ToUint16: ES5.ToUint16,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
	ToInt8: function ToInt8(argument) {
		var int8bit = this.ToUint8(argument);
		return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
	ToUint8: function ToUint8(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x100);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
	ToUint8Clamp: function ToUint8Clamp(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number <= 0) { return 0; }
		if (number >= 0xFF) { return 0xFF; }
		var f = Math.floor(argument);
		if (f + 0.5 < number) { return f + 1; }
		if (number < f + 0.5) { return f; }
		if (f % 2 !== 0) { return f + 1; }
		return f;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
	ToString: function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new TypeError('Cannot convert a Symbol value to a string');
		}
		return String(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
	ToObject: function ToObject(value) {
		this.RequireObjectCoercible(value);
		return Object(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	ToPropertyKey: function ToPropertyKey(argument) {
		var key = this.ToPrimitive(argument, String);
		return typeof key === 'symbol' ? symbolToStr.call(key) : this.ToString(key);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	ToLength: function ToLength(argument) {
		var len = this.ToInteger(argument);
		if (len <= 0) { return 0; } // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
		return len;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-canonicalnumericindexstring
	CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
		if (toStr.call(argument) !== '[object String]') {
			throw new TypeError('must be a string');
		}
		if (argument === '-0') { return -0; }
		var n = this.ToNumber(argument);
		if (this.SameValue(this.ToString(n), argument)) { return n; }
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
	RequireObjectCoercible: ES5.CheckObjectCoercible,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	IsArray: Array.isArray || function IsArray(argument) {
		return toStr.call(argument) === '[object Array]';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
	// IsCallable: ES5.IsCallable,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	IsConstructor: function IsConstructor(argument) {
		return this.IsCallable(argument); // unfortunately there's no way to truly check this without try/catch `new argument`
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
	IsExtensible: function IsExtensible(obj) {
		if (!Object.preventExtensions) { return true; }
		if (isPrimitive(obj)) {
			return false;
		}
		return Object.isExtensible(obj);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
	IsInteger: function IsInteger(argument) {
		if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
			return false;
		}
		var abs = Math.abs(argument);
		return Math.floor(abs) === abs;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
	IsPropertyKey: function IsPropertyKey(argument) {
		return typeof argument === 'string' || typeof argument === 'symbol';
	},

	// http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp
	IsRegExp: function IsRegExp(argument) {
		if (!argument || typeof argument !== 'object') {
			return false;
		}
		if (hasSymbols) {
			var isRegExp = RegExp[Symbol.match];
			if (typeof isRegExp !== 'undefined') {
				return ES5.ToBoolean(isRegExp);
			}
		}
		return hasRegExpMatcher(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
	// SameValue: ES5.SameValue,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
	SameValueZero: function SameValueZero(x, y) {
		return (x === y) || ($isNaN(x) && $isNaN(y));
	}
});

delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

module.exports = ES6;

},{"./es5":4,"./helpers/assign":6,"./helpers/isFinite":7,"./helpers/isPrimitive":8,"./helpers/mod":9,"./helpers/sign":10,"es-to-primitive/es6":12,"function-bind":15,"is-regex":38}],6:[function(_dereq_,module,exports){
var has = Object.prototype.hasOwnProperty;
module.exports = Object.assign || function assign(target, source) {
	for (var key in source) {
		if (has.call(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};

},{}],7:[function(_dereq_,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],8:[function(_dereq_,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],9:[function(_dereq_,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],10:[function(_dereq_,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],11:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = _dereq_('./helpers/isPrimitive');

var isCallable = _dereq_('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

},{"./helpers/isPrimitive":13,"is-callable":26}],12:[function(_dereq_,module,exports){
'use strict';

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = _dereq_('./helpers/isPrimitive');
var isCallable = _dereq_('is-callable');
var isDate = _dereq_('is-date-object');
var isSymbol = _dereq_('is-symbol');

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (PreferredType === String) {
			hint = 'string';
		} else if (PreferredType === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDate(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};

},{"./helpers/isPrimitive":13,"is-callable":26,"is-date-object":28,"is-symbol":42}],13:[function(_dereq_,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],14:[function(_dereq_,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],15:[function(_dereq_,module,exports){
var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


},{}],16:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/get-function-name-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/get-function-name-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/get-function-name-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/get-function-name-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/get-function-name-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/get-function-name-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/get-function-name-x" title="npm version">
 * <img src="https://badge.fury.io/js/get-function-name-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * getFunctionName module. Returns the name of the function.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.10
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-function-name-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:2,
  maxstatements:13, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var isFunction = _dereq_('is-function-x');
  var getFnName;

  if ((function test() {}).name !== 'test') {
    var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    var fToString = Function.prototype.toString;
    var pMatch = String.prototype.match;
    var pReplace = String.prototype.replace;
    var s = _dereq_('white-space-x').ws;
    var reName = new RegExp(
      '^[' + s + ']*(?:function|class)[' + s + ']*\\*?[' + s + ']+([\\w\\$]+)[' + s + ']*',
      'i'
    );
    getFnName = function getName(fn) {
      var name = pMatch.call(
        pReplace.call(fToString.call(fn), STRIP_COMMENTS, ' '),
        reName
      );
      return name && name[1] !== 'anonymous' ? name[1] : '';
    };
  } else {
    /*jshint evil:true */
    if ((new Function()).name === 'anonymous') {
      getFnName = function getName(fn) {
        return fn.name && fn.name !== 'anonymous' ? fn.name : '';
      };
    }
  }
  /**
   * This method returns the name of the function, or `undefined` if not
   * a function.
   *
   * @param {Function} fn The function to get the name of.
   * @return {undefined|string} The name of the function,  or `undefined` if
   *  not a function.
   * @example
   * var getFunctionName = require('get-function-name-x');
   *
   * getFunctionName(); // undefined
   * getFunctionName(Number.MIN_VALUE); // undefined
   * getFunctionName('abc'); // undefined
   * getFunctionName(true); // undefined
   * getFunctionName({ name: 'abc' }); // undefined
   * getFunctionName(function () {}); // ''
   * getFunctionName(new Function ()); // ''
   * getFunctionName(function test1() {}); // 'test1'
   * getFunctionName(function* test2() {}); // 'test2'
   * getFunctionName(class Test {}); // 'Test'
   */
  module.exports = function getFunctionName(fn) {
    if (!isFunction(fn)) {
      return;
    }
    return getFnName ? getFnName(fn) : fn.name;
  };
}());

},{"is-function-x":30,"white-space-x":54}],17:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/has-own-property-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/has-own-property-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/has-own-property-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/has-own-property-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/has-own-property-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/has-own-property-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/has-own-property-x" title="npm version">
 * <img src="https://badge.fury.io/js/has-own-property-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * hasOwnProperty module.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.11
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-own-property-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:2, maxdepth:1,
  maxstatements:5, maxcomplexity:1 */

/*global module */

;(function () {
  'use strict';

  var pHasOwnProperty = Object.prototype.hasOwnProperty;
  var toObject = _dereq_('to-object-x');
  var toPrimitive = _dereq_('es-to-primitive/es6');
  var safeToString = _dereq_('safe-to-string-x');

  /**
   * The `hasOwnProperty` method returns a boolean indicating whether
   * the `object` has the specified `property`. Does not attempt to fix known
   * issues in older browsers, but does ES6ify the method.
   *
   * @param {!Object} object The object to test.
   * @param {string|Symbol} property The name or Symbol of the property to test.
   * @return {boolean} `true` if the property is set on `object`, else `false`.
   * @example
   * var hasOwnProperty = require('has-own-property-x');
   * var o = {
   *   foo: 'bar'
   * };
   *
   *
   * hasOwnProperty(o, 'bar'); // false
   * hasOwnProperty(o, 'foo'); // true
   * hasOwnProperty(undefined, 'foo');
   *                   // TypeError: Cannot convert undefined or null to object
   */
  module.exports = function hasOwnProperty(object, property) {
    return pHasOwnProperty.call(
      toObject(object),
      safeToString(toPrimitive(property, String))
    );
  };
}());

},{"es-to-primitive/es6":12,"safe-to-string-x":50,"to-object-x":51}],18:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/has-symbol-support-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/has-symbol-support-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/has-symbol-support-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/has-symbol-support-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/has-symbol-support-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/has-symbol-support-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/has-symbol-support-x" title="npm version">
 * <img src="https://badge.fury.io/js/has-symbol-support-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * hasSymbolSupport module. Tests if `Symbol` exists and creates the correct
 * type.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.10
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-symbol-support-x
 */

/*jslint maxlen:80, es6:true, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:false, esnext:true, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:1, maxcomplexity:1 */

/*global module */

;(function () {
  'use strict';

  /**
   * Indicates if `Symbol`exists and creates the correct type.
   * `true`, if it exists and creates the correct type, otherwise `false`.
   *
   * @type boolean
   */
  module.exports = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
}());

},{}],19:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/has-to-string-tag-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/has-to-string-tag-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/has-to-string-tag-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/has-to-string-tag-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/has-to-string-tag-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/has-to-string-tag-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/has-to-string-tag-x" title="npm version">
 * <img src="https://badge.fury.io/js/has-to-string-tag-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * hasToStringTag tests if @@toStringTag is supported. `true` if supported.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.9
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module has-to-string-tag-x
 */

/*jslint maxlen:80, es6:true, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:false, esnext:true, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:1, maxcomplexity:1 */

/*global module */

;(function () {
  'use strict';

  /**
   * Indicates if `Symbol.toStringTag`exists and is the correct type.
   * `true`, if it exists and is the correct type, otherwise `false`.
   *
   * @type boolean
   */
  module.exports = _dereq_('has-symbol-support-x') &&
    typeof Symbol.toStringTag === 'symbol';
}());

},{"has-symbol-support-x":18}],20:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isStandardArguments = function isArguments(value) {
	return toStr.call(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		toStr.call(value) !== '[object Array]' &&
		toStr.call(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

},{}],21:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-array-buffer-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/is-array-buffer-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-array-buffer-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-array-buffer-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/is-array-buffer-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-array-buffer-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-array-buffer-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-array-buffer-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * isArrayBuffer module. Detect whether or not an object is an Arraybuffer.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.12
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-array-buffer-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:2, maxdepth:3,
  maxstatements:14, maxcomplexity:6 */

/*global module */

;(function () {
  'use strict';

  var isObjectLike = _dereq_('is-object-like-x');
  var hasABuf = typeof ArrayBuffer === 'function';
  var toStringTag, aBufTag, bLength;

  if (hasABuf) {
    if (_dereq_('has-to-string-tag-x')) {
      try {
        bLength = Object.getOwnPropertyDescriptor(
          ArrayBuffer.prototype,
          'byteLength'
        ).get;
        bLength =
          typeof bLength.call(new ArrayBuffer(4)) === 'number' && bLength;
      } catch (ignore) {
        bLength = null;
      }
    }
    if (!bLength) {
      toStringTag = _dereq_('to-string-tag-x');
      aBufTag = '[object ArrayBuffer]';
    }
  }

  /**
   * Determine if an `object` is an `ArrayBuffer`.
   *
   * @param {*} object The object to test.
   * @return {boolean} `true` if the `object` is an `ArrayBuffer`,
   *  else false`.
   * @example
   * var isArrayBuffer = require('is-array-buffer-x');
   *
   * isArrayBuffer(new ArrayBuffer(4)); // true
   * isArrayBuffer(null); // false
   * isArrayBuffer([]); // false
   */
  module.exports = function isArrayBuffer(object) {
    if (!hasABuf || !isObjectLike(object)) {
      return false;
    }
    if (!bLength) {
      return toStringTag(object) === aBufTag;
    }
    try {
      return typeof bLength.call(object) === 'number';
    } catch (ignore) {}
    return false;
  };
}());

},{"has-to-string-tag-x":19,"is-object-like-x":34,"to-string-tag-x":52}],22:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-array-like-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/is-array-like-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-array-like-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-array-like-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-array-like-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-array-like-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-array-like-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-array-like-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * ES6 isArrayLike module.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.12
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-array-like-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:4, maxcomplexity:1 */

/*global module */

;(function () {
  'use strict';

  var isNil = _dereq_('is-nil-x');
  var isFunction = _dereq_('is-function-x');
  var isLength = _dereq_('lodash.islength');

  /**
   * Checks if value is array-like. A value is considered array-like if it's
   * not a function and has a `length` that's an integer greater than or
   * equal to 0 and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @param {*} value The object to be tested.
   * @return {boolean} Returns `true` if subject is array-like, else `false`.
   * @example
   * var isArrayLike = require('is-array-like-x');
   *
   * isArrayLike([1, 2, 3]); // true
   * isArrayLike(document.body.children); // true
   * isArrayLike('abc'); // true
   * isArrayLike(_.noop); // false
   */
  module.exports = function isArrayLike(value) {
    return !isNil(value) && !isFunction(value) && isLength(value.length);
  };
}());

},{"is-function-x":30,"is-nil-x":32,"lodash.islength":45}],23:[function(_dereq_,module,exports){
'use strict';

var isCallable = _dereq_('is-callable');
var fnToStr = Function.prototype.toString;
var isNonArrowFnRegex = /^\s*function/;
var isArrowFnWithParensRegex = /^\([^\)]*\) *=>/;
var isArrowFnWithoutParensRegex = /^[^=]*=>/;

module.exports = function isArrowFunction(fn) {
	if (!isCallable(fn)) { return false; }
	var fnStr = fnToStr.call(fn);
	return fnStr.length > 0 &&
		!isNonArrowFnRegex.test(fnStr) &&
		(isArrowFnWithParensRegex.test(fnStr) || isArrowFnWithoutParensRegex.test(fnStr));
};

},{"is-callable":26}],24:[function(_dereq_,module,exports){
'use strict';

var boolToStr = Boolean.prototype.toString;

var tryBooleanObject = function tryBooleanObject(value) {
	try {
		boolToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var boolClass = '[object Boolean]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isBoolean(value) {
	if (typeof value === 'boolean') { return true; }
	if (typeof value !== 'object') { return false; }
	return hasToStringTag ? tryBooleanObject(value) : toStr.call(value) === boolClass;
};

},{}],25:[function(_dereq_,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}

},{}],26:[function(_dereq_,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],27:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-data-view-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/is-data-view-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-data-view-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-data-view-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/is-data-view-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-data-view-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-data-view-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-data-view-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * isDataView module. Detect whether or not an object is a DataView.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.13
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-data-view-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:3,
  maxstatements:17, maxcomplexity:6 */

/*global module */

;(function () {
  'use strict';

  var isObjectLike = _dereq_('is-object-like-x');
  var hasDView = typeof DataView === 'function';
  var getByteLength, legacyCheck;

  if (hasDView) {
    if (_dereq_('has-to-string-tag-x')) {
      try {
        getByteLength = Object.getOwnPropertyDescriptor(
          DataView.prototype,
          'byteLength'
        ).get;
        getByteLength = typeof getByteLength.call(
          new DataView(new ArrayBuffer(4))
        ) !== 'number' && getByteLength;
      } catch (ignore) {
        getByteLength = null;
      }
    }
    if (!getByteLength) {
      var toStringTag = _dereq_('to-string-tag-x');
      var dViewTag = '[object DataView]';
      if (toStringTag(new DataView(new ArrayBuffer(4))) === dViewTag) {
        legacyCheck = function byStringTag(object) {
          return toStringTag(object) === dViewTag;
        };
      } else {
        var isArrayBuffer = _dereq_('is-array-buffer-x');
        legacyCheck = function byDuckType(object) {
          return typeof object.byteLength === 'number' &&
            typeof object.byteOffset === 'number' &&
            typeof object.getFloat32 === 'function' &&
            typeof object.setFloat64 === 'function' &&
            isArrayBuffer(object.buffer);
        };
      }
    }
  }

  /**
   * Determine if an `object` is an `DataView`.
   *
   * @param {*} object The object to test.
   * @return {boolean} `true` if the `object` is a `DataView`, else `false`.
   * @example
   * var isDataView = require('is-data-view-x');
   * var ab = new ArrayBuffer(4);
   * var dv = new DataView(ab);
   *
   * isDataView(ab); // false
   * isDataView(true); // false
   * isDataView(dv); // true
   */
  module.exports = function isDataView(object) {
    if (!hasDView || !isObjectLike(object)) {
      return false;
    }
    if (legacyCheck) {
      return legacyCheck(object);
    }
    try {
      return typeof getByteLength.call(object) === 'number';
    } catch (ignore) {}
    return false;
  };
}());

},{"has-to-string-tag-x":19,"is-array-buffer-x":21,"is-object-like-x":34,"to-string-tag-x":52}],28:[function(_dereq_,module,exports){
'use strict';

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};

},{}],29:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-error-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/is-error-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-error-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-error-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-error-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-error-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-error-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-error-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * isError module. Detect whether a value is an error.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.12
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-error-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:2,
  maxstatements:10, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var toStringTag = _dereq_('to-string-tag-x');
  var isObjectLike = _dereq_('is-object-like');
  var $getPrototypeOf = Object.getPrototypeOf;
  var errorCheck = function checkIfError(value) {
    return toStringTag(value) === '[object Error]';
  };

  if (!errorCheck(Error.prototype)) {
    var errorProto = Error.prototype;
    var testStringTag = errorCheck;
    errorCheck = function checkIfError(value) {
      return value === errorProto || testStringTag(value);
    };
  }

  /**
   * Determine whether or not a given `value` is an `Error` type.
   *
   * @param {*} value The object to be tested.
   * @return {boolean} Returns `true` if `value` is an `Error` type,
   *  else `false`.
   * @example
   * var isError = require('is-error-x');
   *
   * isError(); // false
   * isError(Number.MIN_VALUE); // false
   * isError('abc'); // false
   * isError(new Error()); //true
   */
  module.exports = function isError(value) {
    if (!isObjectLike(value)) {
      return false;
    }
    var object = value;
    var maxLoop = 100;
    while (object && maxLoop > -1) {
      if (errorCheck(object)) {
        return true;
      }
      object = $getPrototypeOf(object);
      maxLoop -= 1;
    }
    return false;
  };
}());

},{"is-object-like":35,"to-string-tag-x":52}],30:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-function-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/is-function-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-function-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-function-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/is-function-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-function-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-function-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-function-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * isFunction module. Determine whether a given value is a function object.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.5
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-function-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:8, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var fToString = Function.prototype.toString;
  var toStringTag = _dereq_('to-string-tag-x');
  var hasToStringTag = _dereq_('has-to-string-tag-x');
  var isPrimitive = _dereq_('is-primitive');
  var funcTag = '[object Function]';
  var genTag = '[object GeneratorFunction]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @private
   * @param {*} value The value to check.
   * @return {boolean} Returns `true` if `value` is correctly classified,
   * else `false`.
   */
  function tryFunctionObject(value) {
    try {
      fToString.call(value);
      return true;
    } catch (ignore) {}
    return false;
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @param {*} value The value to check.
   * @return {boolean} Returns `true` if `value` is correctly classified,
   * else `false`.
   * @example
   * var isFunction = require('is-function-x');
   *
   * isFunction(); // false
   * isFunction(Number.MIN_VALUE); // false
   * isFunction('abc'); // false
   * isFunction(true); // false
   * isFunction({ name: 'abc' }); // false
   * isFunction(function () {}); // true
   * isFunction(new Function ()); // true
   * isFunction(function* test1() {}); // true
   * isFunction(function test2(a, b) {}); // true
   * isFunction(class Test {}); // true
   * isFunction((x, y) => {return this;}); // true
   */
  module.exports = function isFunction(value) {
    if (isPrimitive(value)) {
      return false;
    }
    if (hasToStringTag) {
      return tryFunctionObject(value);
    }
    var strTag = toStringTag(value);
    return strTag === funcTag || strTag === genTag;
  };
}());

},{"has-to-string-tag-x":19,"is-primitive":37,"to-string-tag-x":52}],31:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-map-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/is-map-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-map-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-map-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/is-map-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-map-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-map-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-map-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * isMap module. Detect whether or not an object is an ES6 Map.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.12
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-map-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:2,
  maxstatements:8, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var isObjectLike, getSize;

  if (typeof Map === 'function') {
    try {
      getSize = Object.getOwnPropertyDescriptor(Map.prototype, 'size').get;
      getSize = typeof getSize.call(new Map()) === 'number' && getSize;
      isObjectLike = _dereq_('is-object-like-x');
    } catch (ignore) {
      getSize = null;
    }
  }

  /**
   * Determine if an `object` is a `Map`.
   *
   * @param {*} object The object to test.
   * @return {boolean} `true` if the `object` is a `Map`,
   *  else false`
   * @example
   * var isMap = require('is-map-x');
   * var m = new Map();
   *
   * isMap([]); // false
   * isMap(true); // false
   * isMap(m); // true
   */
  module.exports = function isMap(object) {
    if (!getSize || !isObjectLike(object)) {
      return false;
    }
    try {
      return typeof getSize.call(object) === 'number';
    } catch (ignore) {}
    return false;
  };
}());

},{"is-object-like-x":34}],32:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-nil-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/is-nil-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-nil-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-nil-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-nil-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-nil-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-nil-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-nil-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * isNil module.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.9
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-nil-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:3, maxcomplexity:2 */

/*global module */

;(function () {
  'use strict';

  var isUndefined = _dereq_('validate.io-undefined');
  var isNull = _dereq_('lodash.isnull');

  /**
   * Checks if `value` is `null` or `undefined`.
   *
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
   * @example
   *
   * _.isNil(null);
   * // => true
   *
   * _.isNil(void 0);
   * // => true
   *
   * _.isNil(NaN);
   * // => false
   */
  module.exports = function isNil(value) {
    return isNull(value) || isUndefined(value);
  };
}());

},{"lodash.isnull":47,"validate.io-undefined":53}],33:[function(_dereq_,module,exports){
'use strict';

var numToStr = Number.prototype.toString;
var tryNumberObject = function tryNumberObject(value) {
	try {
		numToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var numClass = '[object Number]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isNumberObject(value) {
	if (typeof value === 'number') { return true; }
	if (typeof value !== 'object') { return false; }
	return hasToStringTag ? tryNumberObject(value) : toStr.call(value) === numClass;
};

},{}],34:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-object-like-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/is-object-like-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-object-like-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-object-like-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-object-like-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-object-like-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-object-like-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-object-like-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * ES6 isObjectLike module.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.10
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-object-like-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:3, maxcomplexity:1 */

/*global module */

;(function () {
  'use strict';

  var isFunction = _dereq_('is-function-x');
  var isPrimitive = _dereq_('is-primitive');

  /**
   * Checks if `value` is object-like. A value is object-like if it's not a
   * primitive and not a function.
   *
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   * var isObjectLike = require('is-object-like-x');
   *
   * isObjectLike({});
   * // => true
   *
   * isObjectLike([1, 2, 3]);
   * // => true
   *
   * isObjectLike(_.noop);
   * // => false
   *
   * isObjectLike(null);
   * // => false
   */
  module.exports = function isObjectLike(value) {
    return !isPrimitive(value) && !isFunction(value);
  };
}());

},{"is-function-x":30,"is-primitive":37}],35:[function(_dereq_,module,exports){
'use strict'

module.exports = function isObjectLike (value) {
  return (typeof value === 'object' || typeof value === 'function') && value !== null
}

},{}],36:[function(_dereq_,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],37:[function(_dereq_,module,exports){
/*!
 * is-primitive <https://github.com/jonschlinkert/is-primitive>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

// see http://jsperf.com/testing-value-is-primitive/7
module.exports = function isPrimitive(value) {
  return value == null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],38:[function(_dereq_,module,exports){
'use strict';

var regexExec = RegExp.prototype.exec;
var tryRegexExec = function tryRegexExec(value) {
	try {
		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
	if (typeof value !== 'object') { return false; }
	return hasToStringTag ? tryRegexExec(value) : toStr.call(value) === regexClass;
};

},{}],39:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-set-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/is-set-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-set-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-set-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/is-set-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-set-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-set-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-set-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * isSet module. Detect whether or not an object is an ES6 SET.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.10
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-set-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:2,
  maxstatements:8, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var isObjectLike, getSize;

  if (typeof Set === 'function') {
    try {
      getSize = Object.getOwnPropertyDescriptor(Set.prototype, 'size').get;
      getSize = typeof getSize.call(new Set()) === 'number' && getSize;
      isObjectLike = _dereq_('is-object-like-x');
    } catch (ignore) {
      getSize = null;
    }
  }

  /**
   * Determine if an `object` is a `Set`.
   *
   * @param {*} object The object to test.
   * @return {boolean} `true` if the `object` is a `Set`,
   *  else false`
   * @example
   * var isSet = require('is-set-x');
   * var s = new Set();
   *
   * isSet([]); // false
   * isSet(true); // false
   * isSet(s); // true
   */
  module.exports = function isSet(object) {
    if (!getSize || !isObjectLike(object)) {
      return false;
    }
    try {
      return typeof getSize.call(object) === 'number';
    } catch (ignore) {}

    return false;
  };
}());

},{"is-object-like-x":34}],40:[function(_dereq_,module,exports){
'use strict';

var strValue = String.prototype.valueOf;
var tryStringObject = function tryStringObject(value) {
	try {
		strValue.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var strClass = '[object String]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isString(value) {
	if (typeof value === 'string') { return true; }
	if (typeof value !== 'object') { return false; }
	return hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;
};

},{}],41:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/is-surrogate-pair-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/is-surrogate-pair-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/is-surrogate-pair-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/is-surrogate-pair-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/is-surrogate-pair-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/is-surrogate-pair-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/is-surrogate-pair-x" title="npm version">
 * <img src="https://badge.fury.io/js/is-surrogate-pair-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * isSurrogatePair module. Determine if two characters make a surrogate pair.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.11
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module is-surrogate-pair-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:2, maxdepth:3,
  maxstatements:8, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var pCharCodeAt = String.prototype.charCodeAt;

  /**
   * Tests if the two character arguments combined are a valid UTF-16
   * surrogate pair.
   *
   * @param {*} char1 The first character of a suspected surrogate pair.
   * @param {*} char2 The second character of a suspected surrogate pair.
   * @return {boolean} Returns true if the two characters create a valid
   *  UTF-16 surrogate pair; otherwise false.
   * @example
   * var isSurrogatePair = require('is-surrogate-pair-x');
   * var test1 = 'a';
   * var test2 = '𠮟';
   *
   * isSurrogatePair(test1.charAt(0), test1.charAt(1)); // false
   * isSurrogatePair(test2.charAt(0), test2.charAt(1)); // true
   */
  module.exports = function isSurrogatePair(char1, char2) {
    if (typeof char1 === 'string' && typeof char2 === 'string') {
      var code1 = pCharCodeAt.call(char1);
      if (code1 >= 0xD800 && code1 <= 0xDBFF) {
        var code2 = pCharCodeAt.call(char2);
        if (code2 >= 0xDC00 && code2 <= 0xDFFF) {
          return true;
        }
      }
    }
    return false;
  };
}());

},{}],42:[function(_dereq_,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') { return false; }
		return symStringRegex.test(symToStr.call(value));
	};
	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') { return true; }
		if (toStr.call(value) !== '[object Symbol]') { return false; }
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {
	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false;
	};
}

},{}],43:[function(_dereq_,module,exports){
(function (global){
'use strict';

var forEach = _dereq_('foreach');

var toStr = Object.prototype.toString;
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var typedArrays = {
	Float32Array: true,
	Float64Array: true,
	Int8Array: true,
	Int16Array: true,
	Int32Array: true,
	Uint8Array: true,
	Uint8ClampedArray: true,
	Uint16Array: true,
	Uint32Array: true
};

var slice = String.prototype.slice;
var toStrTags = {};
var gOPD = Object.getOwnPropertyDescriptor;
if (hasToStringTag && gOPD && Object.getPrototypeOf) {
	forEach(typedArrays, function (_, typedArray) {
		var arr = new global[typedArray]();
		var proto = Object.getPrototypeOf(arr);
		toStrTags[typedArray] = gOPD(proto, Symbol.toStringTag).get;
	});
}

var tryTypedArrays = function tryTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) {/**/}
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) { return !!typedArrays[slice.call(toStr.call(value), 8, -1)]; }
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"foreach":14}],44:[function(_dereq_,module,exports){
/**
 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isPlainObject = _dereq_('lodash.isplainobject');

/**
 * Checks if `value` is likely a DOM element.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * _.isElement(document.body);
 * // => true
 *
 * _.isElement('<body>');
 * // => false
 */
function isElement(value) {
  return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isElement;

},{"lodash.isplainobject":48}],45:[function(_dereq_,module,exports){
/**
 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],46:[function(_dereq_,module,exports){
/**
 * lodash 3.0.6 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array constructors, and
  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(funcToString.call(value));
  }
  return isObjectLike(value) &&
    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
}

module.exports = isNative;

},{}],47:[function(_dereq_,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is `null`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _.isNull(null);
 * // => true
 *
 * _.isNull(void 0);
 * // => false
 */
function isNull(value) {
  return value === null;
}

module.exports = isNull;

},{}],48:[function(_dereq_,module,exports){
/**
 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototypeOf = Object.getPrototypeOf;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = objectProto;
  if (typeof value.constructor == 'function') {
    proto = getPrototypeOf(value);
  }
  if (proto === null) {
    return true;
  }
  var Ctor = proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;

},{}],49:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/require-object-coercible-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/require-object-coercible-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/require-object-coercible-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/require-object-coercible-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/require-object-coercible-x#info=devDependencies"
 * title="devDependency status">
 * <img
 * src="https://david-dm.org/Xotic750/require-object-coercible-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a
 * href="https://badge.fury.io/js/require-object-coercible-x"
 * title="npm version">
 * <img src="https://badge.fury.io/js/require-object-coercible-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * RequireObjectCoercible module.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.4
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module require-object-coercible-x
 */

/*jslint maxlen:80, es6:true, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:false, esnext:true, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:3, maxcomplexity:2 */

/*global module */

;(function () {
  'use strict';

  var isNil = _dereq_('is-nil-x');

  /**
   * The abstract operation RequireObjectCoercible throws an error if argument
   * is a value that cannot be converted to an Object using ToObject.
   *
   * @param {*} value The `value` to check.
   * @throws {TypeError} If `value` is a `null` or `undefined`.
   * @return {string} The `value`.
   * @example
   * var RequireObjectCoercible = require('require-object-coercible-x');
   *
   * RequireObjectCoercible(); // TypeError
   * RequireObjectCoercible(null); // TypeError
   * RequireObjectCoercible('abc'); // 'abc'
   * RequireObjectCoercible(true); // true
   * RequireObjectCoercible(Symbol('foo')); // Symbol('foo')
   */
  module.exports = function RequireObjectCoercible(value) {
		if (isNil(value)) {
			throw new TypeError('Cannot call method on ' + value);
		}
		return value;
  };
}());

},{"is-nil-x":32}],50:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/safe-to-string-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/safe-to-string-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/safe-to-string-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/safe-to-string-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/safe-to-string-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/safe-to-string-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/safe-to-string-x" title="npm version">
 * <img src="https://badge.fury.io/js/safe-to-string-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * ES6 safeToString module. Converts a `Symbol` literal or object to `Symbol()`
 * instead of throwing a `TypeError`. Its primary use is for logging/debugging.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.1.10
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module safe-to-string-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:4, maxcomplexity:2 */

/*global module */

;(function () {
  'use strict';

  var $String = String;
  var isSymbol = _dereq_('is-symbol');
  var pToString = _dereq_('has-symbol-support-x') && Symbol.prototype.toString;

  /**
   * The abstract operation `safeToString` converts a `Symbol` literal or
   * object to `Symbol()` instead of throwing a `TypeError`.
   *
   * @param {*} value The value to convert to a string.
   * @return {string} The converted value.
   * @example
   * var safeToString = require('safe-to-string-x');
   *
   * safeToString(); // 'undefined'
   * safeToString(null); // 'null'
   * safeToString('abc'); // 'abc'
   * safeToString(true); // 'true'
   * safeToString(Symbol('foo')); // 'Symbol(foo)'
   * safeToString(Symbol.iterator); // 'Symbol(Symbol.iterator)'
   * safeToString(Object(Symbol.iterator)); // 'Symbol(Symbol.iterator)'
   */
  module.exports = function safeToString(value) {
    return pToString && isSymbol(value) ? pToString.call(value): $String(value);
  };
}());

},{"has-symbol-support-x":18,"is-symbol":42}],51:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/to-object-x"
 * title="Travis status">
 * <img
 * src="https://travis-ci.org/Xotic750/to-object-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/to-object-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/to-object-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a
 * href="https://david-dm.org/Xotic750/to-object-x#info=devDependencies"
 * title="devDependency status">
 * <img
 * src="https://david-dm.org/Xotic750/to-object-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a
 * href="https://badge.fury.io/js/to-object-x"
 * title="npm version">
 * <img src="https://badge.fury.io/js/to-object-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * ToObject module.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.4
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-object-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:3, maxcomplexity:1 */

/*global module */

;(function () {
  'use strict';

  var $Object = Object;
  var $requireObjectCoercible = _dereq_('require-object-coercible-x');

  /**
   * The abstract operation ToObject converts argument to a value of
   * type Object.
   *
   * @param {*} value The `value` to convert.
   * @throws {TypeError} If `value` is a `null` or `undefined`.
   * @return {!Object} The `value` converted to an object.
   * @example
   * var ToObject = require('to-object-x');
   *
   * ToObject(); // TypeError
   * ToObject(null); // TypeError
   * ToObject('abc'); // Object('abc')
   * ToObject(true); // Object(true)
   * ToObject(Symbol('foo')); // Object(Symbol('foo'))
   */
  module.exports = function ToObject(value) {
    return $Object($requireObjectCoercible(value));
  };
}());

},{"require-object-coercible-x":49}],52:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/to-string-tag-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/to-string-tag-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/to-string-tag-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/to-string-tag-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/to-string-tag-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/to-string-tag-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/to-string-tag-x" title="npm version">
 * <img src="https://badge.fury.io/js/to-string-tag-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * Get an object's @@toStringTag. Includes fixes to correct ES3 differences
 * for the following.
 * - undefined => '[object Undefined]'
 * - null => '[object Null]'
 *
 * No other fixes are included, so legacy `arguments` will
 * give `[object Object]`, and many older native objects
 * give `[object Object]`. There are also other environmental bugs
 * for example `RegExp` gives `[object Function]` and `Uint8Array`
 * gives `[object Object]` on certain engines. While these and more could
 * be fixed, it was decided that this should be a very raw version and it
 * is left to the coder to use other `is` implimentations for detection.
 * It is also worth noting that as of ES6 `Symbol.toStringTag` can be set on
 * an object and therefore can report any string that it wishes.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.10
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module to-string-tag-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:1, maxdepth:1,
  maxstatements:6, maxcomplexity:3 */

/*global module */

;(function () {
  'use strict';

  var pToString = Object.prototype.toString;
  var isNull = _dereq_('lodash.isnull');
  var isUndefined = _dereq_('validate.io-undefined');
  var nullTag = '[object Null]';
  var undefTag = '[object Undefined]';

  /**
   * The `toStringTag` method returns "[object type]", where type is the
   * object type.
   *
   * @param {*} value The object of which to get the object type string.
   * @return {string} The object type string.
   * @example
   * var o = new Object();
   *
   * toStringTag(o); // returns '[object Object]'
   */
  module.exports = function toStringTag(value) {
    if (isNull(value)) {
      return nullTag;
    }
    if (isUndefined(value)) {
      return undefTag;
    }
    return pToString.call(value);
  };
}());

},{"lodash.isnull":47,"validate.io-undefined":53}],53:[function(_dereq_,module,exports){
/**
*
*	VALIDATE: undefined
*
*
*	DESCRIPTION:
*		- Validates if a value is undefined.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: isUndefined( value )
*	Validates if a value is undefined.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is undefined
*/
function isUndefined( value ) {
	return value === void 0;
} // end FUNCTION isUndefined()


// EXPORTS //

module.exports = isUndefined;

},{}],54:[function(_dereq_,module,exports){
/**
 * @file
 * <a href="https://travis-ci.org/Xotic750/white-space-x"
 * title="Travis status">
 * <img src="https://travis-ci.org/Xotic750/white-space-x.svg?branch=master"
 * alt="Travis status" height="18">
 * </a>
 * <a href="https://david-dm.org/Xotic750/white-space-x"
 * title="Dependency status">
 * <img src="https://david-dm.org/Xotic750/white-space-x.svg"
 * alt="Dependency status" height="18"/>
 * </a>
 * <a href="https://david-dm.org/Xotic750/white-space-x#info=devDependencies"
 * title="devDependency status">
 * <img src="https://david-dm.org/Xotic750/white-space-x/dev-status.svg"
 * alt="devDependency status" height="18"/>
 * </a>
 * <a href="https://badge.fury.io/js/white-space-x" title="npm version">
 * <img src="https://badge.fury.io/js/white-space-x.svg"
 * alt="npm version" height="18">
 * </a>
 *
 * whitespace module.
 *
 * <h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
 * `es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
 * methods that can be faithfully emulated with a legacy JavaScript engine.
 *
 * `es5-sham.js` monkey-patches other ES5 methods as closely as possible.
 * For these methods, as closely as possible to ES5 is not very close.
 * Many of these shams are intended only to allow code to be written to ES5
 * without causing run-time errors in older engines. In many cases,
 * this means that these shams cause many ES5 methods to silently fail.
 * Decide carefully whether this is what you want. Note: es5-sham.js requires
 * es5-shim.js to be able to work properly.
 *
 * `json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.
 *
 * `es6.shim.js` provides compatibility shims so that legacy JavaScript engines
 * behave as closely as possible to ECMAScript 6 (Harmony).
 *
 * @version 1.0.9
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module white-space-x
 */

/*jslint maxlen:80, es6:false, white:true */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, forin:true,
  freeze:true, futurehostile:true, latedef:true, newcap:true, nocomma:true,
  nonbsp:true, singleGroups:true, strict:true, undef:true, unused:true,
  es3:true, esnext:false, plusplus:true, maxparams:2, maxdepth:2,
  maxstatements:12, maxcomplexity:4 */

/*global module */

;(function () {
  'use strict';

  var define = _dereq_('define-properties-x');

  /**
   * An array of the whitespace char codes.
   *
   * @name whiteSpaces
   * @type Array.<number>
   * @property {number} 0 0x0009 // Tab
   * @property {number} 1 0x000a // Line Feed
   * @property {number} 2 0x000b // Vertical Tab
   * @property {number} 3 0x000c // Form Feed
   * @property {number} 4 0x000d // Carriage Return
   * @property {number} 5 0x0020 // Space
   * @property {number} 6 0x00a0 // No-break space
   * @property {number} 7 0x1680 // Ogham space mark
   * @property {number} 8 0x180e // Mongolian vowel separator
   * @property {number} 9 0x2000 // En quad
   * @property {number} 10 0x2001 // Em quad
   * @property {number} 11 0x2002 // En space
   * @property {number} 12 0x2003 // Em space
   * @property {number} 13 0x2004 // Three-per-em space
   * @property {number} 14 0x2005 // Four-per-em space
   * @property {number} 15 0x2006 // Six-per-em space
   * @property {number} 16 0x2007 // Figure space
   * @property {number} 17 0x2008 // Punctuation space
   * @property {number} 18 0x2009 // Thin space
   * @property {number} 19 0x200a // Hair space
   * @property {number} 20 0x2028 // Line separator
   * @property {number} 21 0x2029 // Paragraph separator
   * @property {number} 22 0x202f // Narrow no-break space
   * @property {number} 23 0x205f // Medium mathematical space
   * @property {number} 24 0x3000 // Ideographic space
   * @property {number} 25 0xfeff // Byte Order Mark
   * @example
   * var lib = require('white-space-x');
   * var count = 0x110000;
   * var nws = ''; // A string of all the non-whitepaces
   * do {
   *   count -= 1;
   *   if (lib.whiteSpaces.indexOf(count) < 0) {
   *     nws = String.fromCodePoint(count) + nws;
   *   }
   * } while (count);
   */
  define.property(module.exports, 'whiteSpaces', [
    0x0009, // Tab
    0x000a, // Line Feed
    0x000b, // Vertical Tab
    0x000c, // Form Feed
    0x000d, // Carriage Return
    0x0020, // Space
    //0x0085, // Next line - Not ES5 whitespace
    0x00a0, // No-break space
    0x1680, // Ogham space mark
    0x180e, // Mongolian vowel separator
    0x2000, // En quad
    0x2001, // Em quad
    0x2002, // En space
    0x2003, // Em space
    0x2004, // Three-per-em space
    0x2005, // Four-per-em space
    0x2006, // Six-per-em space
    0x2007, // Figure space
    0x2008, // Punctuation space
    0x2009, // Thin space
    0x200a, // Hair space
    //0x200b, // Zero width space - Not ES5 whitespace
    0x2028, // Line separator
    0x2029, // Paragraph separator
    0x202f, // Narrow no-break space
    0x205f, // Medium mathematical space
    0x3000, // Ideographic space
    0xfeff // Byte Order Mark
  ]);

  /**
   * A string of the whitespace characters.
   *
   * @name ws
   * @type string
   * @default \u0009\u000a\u000b\u000c\u000d\u0020\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff
   * @example
   * var lib = require('white-space-x');
   * var ws = '\u0009\u000a\u000b\u000c\u000d\u0020\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\ufeff';
   * var re1 = new RegExp('^[' + lib.ws + ']+$)');
   * re1.test(ws); // true
   */
  define.property(module.exports, 'ws', module.exports.whiteSpaces.reduce(function (acc, item) {
      return acc + String.fromCharCode(item);
    }, '')
  );
}());

},{"define-properties-x":3}]},{},[1])(1)
});