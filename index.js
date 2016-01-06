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
 * @version 1.0.3
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
    ES = require('es-abstract'),
    defProps = require('define-properties'),
    hasOwnProperty = require('has-own-property-x'),
    toStringTag = require('to-string-tag-x'),
    isPrimitive = require('is-primitive'),
    isNil = require('is-nil-x'),
    isNativeLD = require('lodash.isnative'),
    deepEqual = require('deep-equal-x'),
    pIsPrototypeOf = Object.prototype.isPrototypeOf,
    reIsUint = /^(?:0|[1-9]\d*)$/;

  defProps(module.exports, {
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
    isNull: require('lodash.isnull'),
    /**
     * Checks if `value` is `undefined`.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is `undefined`, else `false`.
     */
    isUndefined: require('validate.io-undefined'),
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
    isArguments: require('is-arguments'),
    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     */
    isString: require('is-string'),
    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a boolean, else `false`.
     */
    isBoolean: require('is-boolean-object'),
    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     */
    isNumber: require('is-number-object'),
    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is a Date object,
     *  else `false`.
     */
    isDate: require('is-date-object'),
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
    isSymbol: require('is-symbol'),
    /**
     * Checks if `value` is classified as a typed array.
     *
     * @function
     * @param {*} value The value to check.
     * @return {boolean} Returns `true` if `value` is correctly classified,
     *  else `false`.
     */
    isTypedArray: require('is-typed-array'),
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
    isPlainObject: require('lodash.isplainobject'),
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
    isFunction: ES.IsCallable,
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
    isObjectLike: require('is-object-like-x'),
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
    isArrayLike: require('is-array-like-x'),
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
    isSafeInteger: function isSafeInteger(value) {
      return ES.IsInteger(value) &&
        value >= -MAX_SAFE_INTEGER &&
        value <= MAX_SAFE_INTEGER;
    },
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
    isLength: require('is-length-x'),
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
    isElement: require('lodash.iselement'),
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
    isBuffer: require('is-buffer'),
    /**
     * Determine if an `object` is an `ArrayBuffer`.
     *
     * @function
     * @param {*} object The object to test.
     * @return {boolean} `true` if the `object` is an `ArrayBuffer`,
     *  else false`.
     */
    isArrayBuffer: require('is-array-buffer-x'),
    /**
     * Determine if an `object` is a `DataView`.
     *
     * @function
     * @param {*} object The object to test.
     * @return {boolean} `true` if the `object` is a `DataView`,
     *  else false`.
     */
    isDataView: require('is-data-view-x'),
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
    isSurrogatePair: require('is-surrogate-pair-x'),
    /**
     * Determine if an `object` is an `Arrow Function`.
     *
     * @function
     * @param {*} object The object to test.
     * @return {boolean} `true` if the `object` is an `Arrow Function`,
     *  else false`.
     */
    isArrowFunction: require('is-arrow-function'),
    /**
     * Determine whether or not a given `value` is an `Error` type.
     *
     * @function
     * @param {*} value The object to be tested.
     * @return {boolean} Returns `true` if `value` is an `Error` type,
     *  else `false`.
     */
    isError: require('is-error-x'),
    /**
     * Determine whether or not a given `value` is a `Map`.
     *
     * @function
     * @param {*} value The object to be tested.
     * @return {boolean} Returns `true` if `value` is a `Map`, else `false`.
     */
    isMap: require('is-map-x'),
    /**
     * Determine whether or not a given `value` is a `Set`.
     *
     * @function
     * @param {*} value The object to be tested.
     * @return {boolean} Returns `true` if `value` is a `Set`, else `false`.
     */
    isSet: require('is-set-x')
  });
}());
