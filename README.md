<a name="module_is-x"></a>
## is-x
<a href="https://travis-ci.org/Xotic750/is-x"
title="Travis status">
<img src="https://travis-ci.org/Xotic750/is-x.svg?branch=master"
alt="Travis status" height="18">
</a>
<a href="https://david-dm.org/Xotic750/is-x"
title="Dependency status">
<img src="https://david-dm.org/Xotic750/is-x.svg"
alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/is-x#info=devDependencies"
title="devDependency status">
<img src="https://david-dm.org/Xotic750/is-x/dev-status.svg"
alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/is-x" title="npm version">
<img src="https://badge.fury.io/js/is-x.svg"
alt="npm version" height="18">
</a>

A collection of the best JavaScript type testing methods.

<h2>ECMAScript compatibility shims for legacy JavaScript engines</h2>
`es5-shim.js` monkey-patches a JavaScript context to contain all EcmaScript 5
methods that can be faithfully emulated with a legacy JavaScript engine.

`es5-sham.js` monkey-patches other ES5 methods as closely as possible.
For these methods, as closely as possible to ES5 is not very close.
Many of these shams are intended only to allow code to be written to ES5
without causing run-time errors in older engines. In many cases,
this means that these shams cause many ES5 methods to silently fail.
Decide carefully whether this is what you want. Note: es5-sham.js requires
es5-shim.js to be able to work properly.

`json3.js` monkey-patches the EcmaScript 5 JSON implimentation faithfully.

`es6.shim.js` provides compatibility shims so that legacy JavaScript engines
behave as closely as possible to ECMAScript 6 (Harmony).

**See**: https://github.com/Xotic750/is-x  
**Version**: 1.0.9  
**Author:** Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  

* [is-x](#module_is-x)
    * [`~isElement`](#module_is-x..isElement) ⇒ <code>boolean</code>
    * [`~isSurrogatePair`](#module_is-x..isSurrogatePair) ⇒ <code>boolean</code>
    * [`~isNil(value)`](#module_is-x..isNil) ⇒ <code>boolean</code>
    * [`~isNull(value)`](#module_is-x..isNull) ⇒ <code>boolean</code>
    * [`~isUndefined(value)`](#module_is-x..isUndefined) ⇒ <code>boolean</code>
    * [`~isEqual(value1, value2)`](#module_is-x..isEqual) ⇒ <code>boolean</code>
    * [`~isStrictEqual(value1, value2)`](#module_is-x..isStrictEqual) ⇒ <code>boolean</code>
    * [`~isGt(value1, value2)`](#module_is-x..isGt) ⇒ <code>boolean</code>
    * [`~isGte(value1, value2)`](#module_is-x..isGte) ⇒ <code>boolean</code>
    * [`~isLt(value1, value2)`](#module_is-x..isLt) ⇒ <code>boolean</code>
    * [`~isLte(value1, value2)`](#module_is-x..isLte) ⇒ <code>boolean</code>
    * [`~isArguments(value)`](#module_is-x..isArguments) ⇒ <code>boolean</code>
    * [`~isString(value)`](#module_is-x..isString) ⇒ <code>boolean</code>
    * [`~isBoolean(value)`](#module_is-x..isBoolean) ⇒ <code>boolean</code>
    * [`~isNumber(value)`](#module_is-x..isNumber) ⇒ <code>boolean</code>
    * [`~isDate(value)`](#module_is-x..isDate) ⇒ <code>boolean</code>
    * [`~isNaN(value)`](#module_is-x..isNaN) ⇒ <code>boolean</code>
    * [`~isFinite(value)`](#module_is-x..isFinite) ⇒ <code>boolean</code>
    * [`~isSymbol(value)`](#module_is-x..isSymbol) ⇒ <code>boolean</code>
    * [`~isTypedArray(value)`](#module_is-x..isTypedArray) ⇒ <code>boolean</code>
    * [`~isPrimitive(value)`](#module_is-x..isPrimitive) ⇒ <code>boolean</code>
    * [`~isPlainObject()`](#module_is-x..isPlainObject) ⇒ <code>boolean</code>
    * [`~isCallable(value)`](#module_is-x..isCallable) ⇒ <code>boolean</code>
    * [`~isConstructor(value)`](#module_is-x..isConstructor) ⇒ <code>boolean</code>
    * [`~isFunction(value)`](#module_is-x..isFunction) ⇒ <code>boolean</code>
    * [`~isRegExp(value)`](#module_is-x..isRegExp) ⇒ <code>boolean</code>
    * [`~isObject(value)`](#module_is-x..isObject) ⇒ <code>boolean</code>
    * [`~isObjectLike(value)`](#module_is-x..isObjectLike) ⇒ <code>boolean</code>
    * [`~isStringTag(value, stringTag)`](#module_is-x..isStringTag) ⇒ <code>boolean</code>
    * [`~isArray(value)`](#module_is-x..isArray) ⇒ <code>boolean</code>
    * [`~isArrayLike(value)`](#module_is-x..isArrayLike) ⇒ <code>boolean</code>
    * [`~isProtoOf(prototypeObj, object)`](#module_is-x..isProtoOf) ⇒ <code>boolean</code>
    * [`~isFrozen(value)`](#module_is-x..isFrozen) ⇒ <code>boolean</code>
    * [`~isSealed(value)`](#module_is-x..isSealed) ⇒ <code>boolean</code>
    * [`~is(value1, value2)`](#module_is-x..is) ⇒ <code>boolean</code>
    * [`~isSameValueZero(value1, value2)`](#module_is-x..isSameValueZero) ⇒ <code>boolean</code>
    * [`~isNegativeZero(value)`](#module_is-x..isNegativeZero) ⇒ <code>boolean</code>
    * [`~isExtensible(value)`](#module_is-x..isExtensible) ⇒ <code>boolean</code>
    * [`~isInteger(value)`](#module_is-x..isInteger) ⇒ <code>boolean</code>
    * [`~isSafeInteger(value)`](#module_is-x..isSafeInteger) ⇒ <code>boolean</code>
    * [`~isPropertyKey(value)`](#module_is-x..isPropertyKey) ⇒ <code>boolean</code>
    * [`~isLength(value)`](#module_is-x..isLength) ⇒ <code>boolean</code>
    * [`~isNative(value)`](#module_is-x..isNative) ⇒ <code>boolean</code>
    * [`~isDeepEqual(value1, value2)`](#module_is-x..isDeepEqual) ⇒ <code>boolean</code>
    * [`~isStrictDeepEqual(value1, value2)`](#module_is-x..isStrictDeepEqual) ⇒ <code>boolean</code>
    * [`~isTypeOf(value, typeOfString)`](#module_is-x..isTypeOf) ⇒ <code>boolean</code>
    * [`~isBuffer(object)`](#module_is-x..isBuffer) ⇒ <code>boolean</code>
    * [`~isArrayBuffer(object)`](#module_is-x..isArrayBuffer) ⇒ <code>boolean</code>
    * [`~isDataView(object)`](#module_is-x..isDataView) ⇒ <code>boolean</code>
    * [`~isOwnPropertyOf(object, property)`](#module_is-x..isOwnPropertyOf) ⇒ <code>boolean</code>
    * [`~isPropertyOf(object, property)`](#module_is-x..isPropertyOf) ⇒ <code>boolean</code>
    * [`~isArrowFunction(object)`](#module_is-x..isArrowFunction) ⇒ <code>boolean</code>
    * [`~isError(value)`](#module_is-x..isError) ⇒ <code>boolean</code>
    * [`~isMap(value)`](#module_is-x..isMap) ⇒ <code>boolean</code>
    * [`~isSet(value)`](#module_is-x..isSet) ⇒ <code>boolean</code>
    * [`~isFunctionName(fn, name)`](#module_is-x..isFunctionName) ⇒ <code>boolean</code>
    * [`~isAnonymous(fn)`](#module_is-x..isAnonymous) ⇒ <code>boolean</code>
    * [`~isArity(fn, arity)`](#module_is-x..isArity) ⇒ <code>boolean</code>
    * [`~isGenerator(fn)`](#module_is-x..isGenerator) ⇒ <code>boolean</code>

<a name="module_is-x..isElement"></a>
### `is-x~isElement` ⇒ <code>boolean</code>
Checks if `value` is likely a DOM element.

**Kind**: inner property of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a DOM element,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isSurrogatePair"></a>
### `is-x~isSurrogatePair` ⇒ <code>boolean</code>
Tests if the two character arguments combined are a valid UTF-16
surrogate pair.

**Kind**: inner property of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns true if the two characters create a valid
 UTF-16 surrogate pair; otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| char1 | <code>\*</code> | The first character of a suspected surrogate pair. |
| char2 | <code>\*</code> | The second character of a suspected surrogate pair. |

<a name="module_is-x..isNil"></a>
### `is-x~isNil(value)` ⇒ <code>boolean</code>
Checks if `value` is `null` or `undefined`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is nullish, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isNull"></a>
### `is-x~isNull(value)` ⇒ <code>boolean</code>
Checks if `value` is `null`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is `null`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isUndefined"></a>
### `is-x~isUndefined(value)` ⇒ <code>boolean</code>
Checks if `value` is `undefined`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is `undefined`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isEqual"></a>
### `is-x~isEqual(value1, value2)` ⇒ <code>boolean</code>
Checks if `value1` is `value2` using == equality.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value1` == `value2`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>\*</code> | The first value to check. |
| value2 | <code>\*</code> | The second value to check. |

<a name="module_is-x..isStrictEqual"></a>
### `is-x~isStrictEqual(value1, value2)` ⇒ <code>boolean</code>
Checks if `value1` is `value2` using === equality.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value1` === `value2`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>\*</code> | The first value to check. |
| value2 | <code>\*</code> | The second value to check. |

<a name="module_is-x..isGt"></a>
### `is-x~isGt(value1, value2)` ⇒ <code>boolean</code>
Checks if `value1` is greater than `value2`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value1` > `value2`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>\*</code> | The first value to check. |
| value2 | <code>\*</code> | The second value to check. |

<a name="module_is-x..isGte"></a>
### `is-x~isGte(value1, value2)` ⇒ <code>boolean</code>
Checks if `value1` is greater than or equal to `value2`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value1` >= `value2`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>\*</code> | The first value to check. |
| value2 | <code>\*</code> | The second value to check. |

<a name="module_is-x..isLt"></a>
### `is-x~isLt(value1, value2)` ⇒ <code>boolean</code>
Checks if `value1` is less than `value2`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value1` < `value2`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>\*</code> | The first value to check. |
| value2 | <code>\*</code> | The second value to check. |

<a name="module_is-x..isLte"></a>
### `is-x~isLte(value1, value2)` ⇒ <code>boolean</code>
Checks if `value1` is less than or equal to `value2`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value1` <= `value2`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>\*</code> | The first value to check. |
| value2 | <code>\*</code> | The second value to check. |

<a name="module_is-x..isArguments"></a>
### `is-x~isArguments(value)` ⇒ <code>boolean</code>
Checks if `value` is likely an `arguments` object.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is correctly classified,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isString"></a>
### `is-x~isString(value)` ⇒ <code>boolean</code>
Checks if `value` is classified as a `String` primitive or object.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is correctly classified,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isBoolean"></a>
### `is-x~isBoolean(value)` ⇒ <code>boolean</code>
Checks if `value` is classified as a boolean primitive or object.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a boolean, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isNumber"></a>
### `is-x~isNumber(value)` ⇒ <code>boolean</code>
Checks if `value` is classified as a `Number` primitive or object.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is correctly classified,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isDate"></a>
### `is-x~isDate(value)` ⇒ <code>boolean</code>
Checks if `value` is classified as a `Date` object.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a Date object,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isNaN"></a>
### `is-x~isNaN(value)` ⇒ <code>boolean</code>
Checks if `value` is `NaN`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is `NaN`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isFinite"></a>
### `is-x~isFinite(value)` ⇒ <code>boolean</code>
Checks if `value` is a finite primitive number.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a finite number,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isSymbol"></a>
### `is-x~isSymbol(value)` ⇒ <code>boolean</code>
Checks if `value` is classified as a `Symbol` primitive or object.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is correctly classified,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isTypedArray"></a>
### `is-x~isTypedArray(value)` ⇒ <code>boolean</code>
Checks if `value` is classified as a typed array.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is correctly classified,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isPrimitive"></a>
### `is-x~isPrimitive(value)` ⇒ <code>boolean</code>
Checks if `value` is a primitive.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a primitive,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isPlainObject"></a>
### `is-x~isPlainObject()` ⇒ <code>boolean</code>
Checks if `value` is a plain object, that is, an object created by the
`Object` constructor or one with a `[[Prototype]]` of `null`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a plain object,
 else `false`.  
<a name="module_is-x..isCallable"></a>
### `is-x~isCallable(value)` ⇒ <code>boolean</code>
Checks if `value` is a 'Function`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a `Function`,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isConstructor"></a>
### `is-x~isConstructor(value)` ⇒ <code>boolean</code>
Checks if `value` is a 'constructor`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a `constructor`,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isFunction"></a>
### `is-x~isFunction(value)` ⇒ <code>boolean</code>
Checks if `value` is callable.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is callable, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isRegExp"></a>
### `is-x~isRegExp(value)` ⇒ <code>boolean</code>
Checks if `value` is classified as a `RegExp` object.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is correctly classified,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isObject"></a>
### `is-x~isObject(value)` ⇒ <code>boolean</code>
Checks if `value` is not a primitive.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is an object, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isObjectLike"></a>
### `is-x~isObjectLike(value)` ⇒ <code>boolean</code>
Checks if `value` is object-like. A value is object-like if it's not a
primitive and not a function.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is object-like,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isStringTag"></a>
### `is-x~isStringTag(value, stringTag)` ⇒ <code>boolean</code>
Checks if `value`'s string tag is the supplied `stringTag`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value`'s the string tag matches
`stringTag`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |
| stringTag | <code>string</code> | The value to check. |

<a name="module_is-x..isArray"></a>
### `is-x~isArray(value)` ⇒ <code>boolean</code>
Checks if `value` is classified as an `Array` object.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is an `Array`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isArrayLike"></a>
### `is-x~isArrayLike(value)` ⇒ <code>boolean</code>
Checks if `value` is array-like. A value is considered array-like if it's
not a function and has a `value.length` that's an integer greater than or
equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is array-like, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isProtoOf"></a>
### `is-x~isProtoOf(prototypeObj, object)` ⇒ <code>boolean</code>
This method allows you to check whether or not an object
exists within another object's prototype chain.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `prototypeObj` is in `object`'s
 prototype chain, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| prototypeObj | <code>\*</code> | An object to be tested against each link in the  prototype chain of the object argument. |
| object | <code>\*</code> | The object whose prototype chain will be searched. |

<a name="module_is-x..isFrozen"></a>
### `is-x~isFrozen(value)` ⇒ <code>boolean</code>
An object is frozen if and only if it is not extensible, all its
properties are non-configurable, and all its data properties
(that is, properties which are not accessor properties with getter
or setter components) are non-writable.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is frozen, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isSealed"></a>
### `is-x~isSealed(value)` ⇒ <code>boolean</code>
Returns true if the object is sealed, otherwise false. An object is
sealed if it is not extensible and if all its properties are
non-configurable and therefore not removable
(but not necessarily non-writable).

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is sealed, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..is"></a>
### `is-x~is(value1, value2)` ⇒ <code>boolean</code>
This method determines whether two values are the same value. Two values
are the same if one of the following holds:
- both undefined
- both null
- both true or both false
- both strings of the same length with the same characters
- both the same object
- both numbers and
- both +0
- both -0
- both NaN
- both non-zero and both not NaN and both have the same value
This is not the same as being equal according to the == operator.
The == operator applies various coercions to both sides (if they are
not the same Type) before testing for equality (resulting in such
behavior as "" == false being true), but Object.is doesn't coerce
either value.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - `true` if the two values are the same value, else
 `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>\*</code> | The first value to compare. |
| value2 | <code>\*</code> | The second value to compare. |

<a name="module_is-x..isSameValueZero"></a>
### `is-x~isSameValueZero(value1, value2)` ⇒ <code>boolean</code>
This method determines whether two values are the same value. Two values
are the same if one of the following holds:
- both undefined
- both null
- both true or both false
- both strings of the same length with the same characters
- both the same object
- both numbers and
- both 0 regardless of sign
- both NaN
- both non-zero and both not NaN and both have the same value
This is not the same as being equal according to the == operator.
The == operator applies various coercions to both sides (if they are
not the same Type) before testing for equality (resulting in such
behavior as "" == false being true), but `is` doesn't coerce
either value.

`isSameValueZero` differs from `is` only in its treatment of +0 and -0.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - `true` if the two values are the same value, else
 `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>\*</code> | The first value to compare. |
| value2 | <code>\*</code> | The second value to compare. |

<a name="module_is-x..isNegativeZero"></a>
### `is-x~isNegativeZero(value)` ⇒ <code>boolean</code>
Determines if an object is `-0`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is `-0`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isExtensible"></a>
### `is-x~isExtensible(value)` ⇒ <code>boolean</code>
Determines if an object is extensible (whether it can have new
properties added to it).

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is extensible, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isInteger"></a>
### `is-x~isInteger(value)` ⇒ <code>boolean</code>
Checks if `value` is an integer.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is an integer, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isSafeInteger"></a>
### `is-x~isSafeInteger(value)` ⇒ <code>boolean</code>
Checks if `value` is a safe integer. An integer is safe if it's
an IEEE-754 double precision number which isn't the result of a rounded
unsafe integer.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a safe integer,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isPropertyKey"></a>
### `is-x~isPropertyKey(value)` ⇒ <code>boolean</code>
The abstract operation IsPropertyKey determines if argument, which must
be an ECMAScript language value or a Completion Record, is a value that
may be used as a property key.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a property key,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isLength"></a>
### `is-x~isLength(value)` ⇒ <code>boolean</code>
Checks if `value` is a valid array-like length.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a valid length,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isNative"></a>
### `is-x~isNative(value)` ⇒ <code>boolean</code>
Checks if `value` is a native function.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a native function,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The value to check. |

<a name="module_is-x..isDeepEqual"></a>
### `is-x~isDeepEqual(value1, value2)` ⇒ <code>boolean</code>
Tests for deep equality. Primitive values are compared with the equal
comparison operator ( == ). This only considers enumerable properties.
It does not test object prototypes, attached symbols, or non-enumerable
properties. This can lead to some potentially surprising results

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - `true` if `actual` and `expected` are deemed equal,
 otherwise `false`. Circular objects will return `false`.  
**See**: https://nodejs.org/api/assert.html  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>\*</code> | First comparison object. |
| value2 | <code>\*</code> | Second comparison object. |

<a name="module_is-x..isStrictDeepEqual"></a>
### `is-x~isStrictDeepEqual(value1, value2)` ⇒ <code>boolean</code>
Tests for deep equality. Primitive values are compared with the equal
comparison operator ( === ).

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - `true` if `actual` and `expected` are deemed equal,
 otherwise `false`. Circular objects will return `false`.  
**See**: https://nodejs.org/api/assert.html  

| Param | Type | Description |
| --- | --- | --- |
| value1 | <code>\*</code> | First comparison object. |
| value2 | <code>\*</code> | Second comparison object. |

<a name="module_is-x..isTypeOf"></a>
### `is-x~isTypeOf(value, typeOfString)` ⇒ <code>boolean</code>
This method returns `true` if the string indicating the type of the
unevaluated operand matches `typeOfString`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - `true` if the `typeof object` string matches
`typeOfString`, else false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The object to test. |
| typeOfString | <code>string</code> | The `typeof` string to test. |

<a name="module_is-x..isBuffer"></a>
### `is-x~isBuffer(object)` ⇒ <code>boolean</code>
Determine if an `object` is a node's `Buffer` class.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - `true` if the `object` is a `Buffer`, else false`.  
**See**: https://iojs.org/api/buffer.html  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>\*</code> | The object to test. |

<a name="module_is-x..isArrayBuffer"></a>
### `is-x~isArrayBuffer(object)` ⇒ <code>boolean</code>
Determine if an `object` is an `ArrayBuffer`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - `true` if the `object` is an `ArrayBuffer`,
 else false`.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>\*</code> | The object to test. |

<a name="module_is-x..isDataView"></a>
### `is-x~isDataView(object)` ⇒ <code>boolean</code>
Determine if an `object` is a `DataView`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - `true` if the `object` is a `DataView`,
 else false`.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>\*</code> | The object to test. |

<a name="module_is-x..isOwnPropertyOf"></a>
### `is-x~isOwnPropertyOf(object, property)` ⇒ <code>boolean</code>
This method returns `true` if the `object` has the specified `property`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - `true` if the `object` has the specified `property`,
 else false`.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>\*</code> | The object to test. |
| property | <code>string</code> &#124; <code>Symbol</code> | The name or Symbol of the property to  test. |

<a name="module_is-x..isPropertyOf"></a>
### `is-x~isPropertyOf(object, property)` ⇒ <code>boolean</code>
This method returns true if the specified `property` is in the specified
`object`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - `true` if the property is set on `object`, else
 `false`.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>\*</code> | The object to test. |
| property | <code>string</code> &#124; <code>Symbol</code> | The name or Symbol of the property to  test. |

<a name="module_is-x..isArrowFunction"></a>
### `is-x~isArrowFunction(object)` ⇒ <code>boolean</code>
Determine if an `object` is an `Arrow Function`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - `true` if the `object` is an `Arrow Function`,
 else false`.  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>\*</code> | The object to test. |

<a name="module_is-x..isError"></a>
### `is-x~isError(value)` ⇒ <code>boolean</code>
Determine whether or not a given `value` is an `Error` type.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is an `Error` type,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The object to be tested. |

<a name="module_is-x..isMap"></a>
### `is-x~isMap(value)` ⇒ <code>boolean</code>
Determine whether or not a given `value` is a `Map`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a `Map`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The object to be tested. |

<a name="module_is-x..isSet"></a>
### `is-x~isSet(value)` ⇒ <code>boolean</code>
Determine whether or not a given `value` is a `Set`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if `value` is a `Set`, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The object to be tested. |

<a name="module_is-x..isFunctionName"></a>
### `is-x~isFunctionName(fn, name)` ⇒ <code>boolean</code>
Determine whether or not a given function is named `name`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if function name is a `name`,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to be tested. |
| name | <code>string</code> | The object to be tested. |

<a name="module_is-x..isAnonymous"></a>
### `is-x~isAnonymous(fn)` ⇒ <code>boolean</code>
Determine whether or not a given function is anonymous.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if function is anonymous, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to be tested. |

<a name="module_is-x..isArity"></a>
### `is-x~isArity(fn, arity)` ⇒ <code>boolean</code>
Determine whether or not a given function's arity matches `arity`.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if the function's arity matched `arity`,
 else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to be tested. |
| arity | <code>number</code> | The `arity` integer to be tested. |

<a name="module_is-x..isGenerator"></a>
### `is-x~isGenerator(fn)` ⇒ <code>boolean</code>
Determine whether or not a given function is an ES6 generator function.

**Kind**: inner method of <code>[is-x](#module_is-x)</code>  
**Returns**: <code>boolean</code> - Returns `true` if the function an ES6 generator
function, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | The function to be tested. |

