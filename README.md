# javascript-utils

Utility functions/classes for JavaScript with no external dependencies.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Custom Data Types](#custom-data-types)
3. [Date and Time](#date-and-time)
4. [Maps](#maps)
5. [Maths](#maths)
6. [Misc](#misc)
7. [Object Handling](#object-handling)
8. [Web](#web)
9. [Coming Soon!](#coming-soon)

## Getting Started

To install (using NPM):

``` npm
npm install dc-javascript-utils --save
```

## Custom Data Types

### StringBuilder

Wrapper class for easier string manipulation.

#### Methods

- append: Append a string to the current instance.
- prepend: Prepend a string to the current instance.
- insertAt: Append a string to the current instance at a specific index.
- replace: Find and replace text in the current instance using either a string or regular expression.
- clear: Clears the current instance.
- copy: Copy the current instance.
- toString: Get the current value of the instance.

#### Properties

- length: A number indicating the current length of the text.
- hasValue: A boolean indicating if the instance currently has a value.

### DeferredPromise

Documentation needed.

### LinkedQueue

Documentation needed.

## Date and Time

Date and time utilities.

### Date

- isValidDate: Check if a value is a date.
- isValidDateTimeStr:Check if a value is a valid datetime string (e.g. in ISO `YYYY-MM-DD HH:ii:ss` format).
- utcDate: Get a UTC datetime in ISO `YYYY-MM-DD HH:ii:ss` format.

### Time

- now: Get the current Unix time in ms.
- time: Get the current Unix time in secs.
- msToTime: Get the timestring of a date in the format `HH:mm:ss.ms`.
- secsToTimeString: Converts seconds to a time string in `mm:ss` or `HH:mm:ss` format.
- parseMilliseconds: Parse milliseconds into a time object.
- prettifyMilliseconds: Convert milliseconds to a human readable string.
- objToMilliseconds: Convert an object of time properties to milliseconds.
- timeZone: Pretty time zone: `+2` or `-9:30`.

## Maps

Maps and coordinate-related utilities.

- bestZoomForBounds: Determines the best zoom level for a Google map.
- clampLatitude: Clamps a latitude value so that it is within the range -90-90.
- wrapLongitude: Wraps a longitude value so that it is within the range -180-180.
- normalizeLatitude: Normalizes a latitude so that it is within the range 0-180.
- normalizeLongitude: Normalizes a longitude so that it is within the range 0-360.
- isSamePosition: Checks if two position objects are equal.
- makePositionObj: Given a object with coords properties returns only its timestamp and coord properties.

## Maths

Various maths utilities.

### Bitwise

- checkNthBitOn: Check a bit is on in a number.
- toggleNthBit: Toggle a bit of a number.
- turnNthBitOff: Turn a bit of a number off.
- turnNthBitOn: Turn a bit of a number on.

### Conversions

- binaryToDecimal: Convert binary to decimal.
- convertBytes: Convert bytes to a human readable string (i.e 1337 = 1.34kB).
- decimalToBinary: Convert decimal to binary.

### Hash

- hashArrayOfStrings: Compute the hash of an array of strings.
- hashString: Compute the hash of a string.
- hashStringSinglePass: A one-pass algorithm to compute the hash of a series of unique strings incrementally.
- hashSumOfIntArray: Compute the hash of an array of ints.
- md5Hex: Create a MD5 hash with hex encoding. Suitable for use in the browser when used with a bundler.
- revisionHash: Create a hash for file revving.

### Math

- integerDivision: Integer division (without remainder).
- isEven: Check if a value is even.
- isOdd: Check if a value is odd.
- proportion: Convert a source value of a source range to a value that is proportional in another destination range.
- round: Rounds a number.
- sum: Sum two or more numbers.

### Random

- randomFromRange: Get a random number between two values.
- randomHslColor: Generate a random HSL color.
- randomNumber: Get a random number up to a value.
- randomValue: Get a random value from an array.
- shuffleArr: Shuffle an array. Ensures the array has been shuffled before returning.
- uniqueRandom: Generate consecutively unique numbers.
- uniqueRandomFromArray: Get consecutively unique values from an array.

### Statistics

- mean: Get the mean of two or more numbers.
- median: Get the median of two or more numbers.
- minDeviationFrom: Compute the min deviation from a value.
- minDeviationFromExcluding: Computes the min deviation from a value, excluding that value.

## Misc

A variety of different utilities such as uuid generation, validating passwords and currying functions.

### Callbacks

- debounce: Debounces a function.
- delay: Delay execution of a callback and cancels a previously registered callback if it wasn't executed yet.
- throttle: Throttle a function.

### Color

- getLuminance: Get the luminance value of a color in HEX format.
- intToHex: Convert a number to a HEX string that can be used as a color.
- colorFromString: Convert a string to a HEX string that can be used as a color.
- hexToRgb: Convert a HEX color to RGB.
- rgbToHex: Convert an RBG color to HEX.

### Functional

- chain: A higher-order function to create a chain of functions following the Chain of Responsibility design pattern.
- noActionFunc: Simple function that does nothing (but return null).
- pick: Get a function which lets picking the properties of an object.
- curry: Curries a function.

### Global

- getGlobalObject: Get a reference to the global object.

### Iterators

- generateRange: Get a generator which yields all of the values of a given range.
- mapYield: Yields values of an array mapping the yielded value.

### Path

- basename: Get the basename of a path.
- getPathExtension: Get the extension of a path.
- pathInfo: Get info about a path.
- filenameExtension: Get the extension of a file.
- dirname: Get the dirname of a path.

### Strings

- getDigits: Get just the digits from a string.
- intSeparateThousands: return a number with thousand delimiters.
- str: Cast a value to a string.
- trim: Trim characters from a string.
- trimStart: Trim characters from the start of a string.
- trimEnd: Trim characters from the start of a string.
- typeToStr: Convert a type to it's string representation.
- pluralize: Basic function for pluralizing words.
- splitOnFirst: Split a string on the first occurrence of a given separator.
- toSingleQuotes: Convert matching double-quotes to single-quotes.
- toDoubleQuotes: Convert matching single-quotes to double-quotes.

### UUID

- uuid: Generate a new typical UUID.
- NonCanonicalUUID: A class for generating UUIDs with the total count of ids suffixed.

### Validation

- validatePassword: Detailed check for a strong password. Returns info about the password strength as well as whether it passed the check.

## Object Handling

Utilities for working with objects and arrays, such as cloning and extending.

### Arrays

- distinct: Get unique elements from an array.
- sumOf: Sum an array of numbers.
- isArrayOfNumber: Check an array is all numbers.
- firstItem: Get the first item of an array.
- lastItem: Get the last item of an array.
- firstNested: Get the first nested item of an array.
- lastNested: Get the last nested item of an array.
- minOf: Get the largest value of an array.
- maxOf: Get the smallest value of an array.
- sortNums: Order an array of numbers.
- removeNulls: Remove null values from a list.
- unshift: "unshift" an array.
- indexWrappedArray: reate an array which allows the usage of negative indices to retrieve its data.
- arrayMoveMutable: Move an item to a new position in the same array.
- arrayMoveImmutable: Create a new array with an item in a new place.

### Clone

- cloneArr: Shallowly clone an array.
- cloneDeep: Clones an object deeply, using either JSON or reflection.
- extend: Extends a destination object with the provided source objects.
- extendShallow: Shallowly extends a destination object with the provided source objects (first dimension).
- deepObjectExtend: Deep object extension.
- deepObjectCloningExtend: Deep object cloning extension implementation. If the source objects contain a property with a reference type, a clone object of the same type of that property will be created and then merged into the destination object.
- extendDecorate: Extends a destination object with the provided source objects.
- cloneRegExp: Clone a RegExp.

### Compare

- is: Function implementing `Object.is` behaviour.
- isObjPropEqual: Check if the properties of two objects compare equal.
- isEqualShallow: Check if two values compare equal shallowly.
- isArrEqualDeep: Check if two arrays compare equal deeply.
- isObjEqualDeep: Check if two objects compare equal deeply.
- partialShallowEqual: Check if a partial object is a subset of another object.
- objDiffShallow: Get an object which contains the differences between two objects.

### Factories

- declarativeFactory: A function to easily create interchangeable factories switching them in a declarative way based on the given runtime parameters.

### Immutability

- deepFreeze: Deep freezes an object.
- createEnum: Create an enum-like object that can't be modified.

### Introspection

isPrimitiveType: Check if a value is a primitive type.
isInt: Check if a value is a number.
isIntString: Check if a value is a number in string form.
isIntOrIntString: Check if a value is a number or number in string form.
isNullOrEmpty: Check if a string is null or empty.
isNullOrWhiteSpace: Check if a value is a null or just whitespace (e.g " ").
isJSONString: Check if a string is a JSON string.
isTrue: Check if a value is true.
isTruthy: Check if a value is truthy.
allTruthy: Check if all values in an array are truthy.
isUndefined: Check if a value is undefined.
isReferenceType: Check if a value is a reference type.
isObject: Check if a value is an object.
isObjectLiteral: Check if a value is an object literal.
isObjectEmpty: Check if a value is an empty object (i.e {}).
isArray: Check if a value is an array.
isCallable: Check if a value is a function.
safeHasOwnProperty: Safe implementation of `Object.prototype.hasOwnProperty()`.
hasCyclicReference: Detect if an object has a cyclic reference.

### Nested Properties

- getNestedPropertyValue: Get a property value from a nested object.
- hasNestedPropertyValue: Check if a nested object has a property.
- setNestedPropertyValue: Set the value for a property in a nested object.
- nestedMapGet: Get a value from a nested map.
- nestedMapHas: Check if a nested map has a value.
- nestedMapSet: Set a value in a nested map.
- nestedTreeMapGet: Get a value from a nested tree map.
- nestedTreeMapHas: Check if a nested tree map has a value.
- nestedTreeMapSet: Set a value in a nested tree map.
- nestedObjectConstructValue: Nest the properties of an object using an array of props definitions and defaults.

### Objects

- mapObject: Map an object, executing a function on each of its properties and returning a new mapped object.
- arrToObject: Map an array to an object.
- selectWhere: Select the properties of an object which return true for a supplied callback function.
- getPrototypes: Return all the properties of a given object traversing it's prototype chain.
- prop: Define an object's property with a getter and an optional setter.
- defineProperty: Shorthand for `Object.defineProperty()`.
- completeObjectAssign: Assign the properties of a given source objects to the target object.

### Weak Equality Functions

- includes: Like `Array.prototype.includes`, but with type coercion.
- findIndex: Finds the index of a value in an array, using type coercion.

## Web

Utilities that work specifically in/with the browser.

### Animation

- rAFLooper: Asynchronously invoke a callback multiple times, each in its own animation frame.
- nestedRAF: Request a predefined number of animation frames and executes a callback after.

### Clipboard

- copyTextToClipboard: Copies text to the clipboard.
- fallbackCopyTextToClipboard: Fallback method for copyTextToClipboard.

### Cookie

- getCookie: Get a cookie value.
- setCookie: Set a cookie value.
- clearCookie: Unset a cookie.

### DOM

- isInViewport: Check if the element is in viewport.
- isScrolledIntoView: Check if a DOM element is scrolled into the scrollable view of it's parent scrollable container.
- hasHorizontalScrollbar: Check if a DOM element has a vertical scrollbar.
- hasVerticalScrollbar: Check if a DOM element has a horizontal scrollbar.
- uniqueElemId: Generate a unique ID which can be used for an element.
- getElementComputedStyle: Get the computed style of an element.
- elementInnerDimensions: Get an element's inner dimensions (height and width without padding).
- countTextareaLines: Get the number of lines in a textarea, including wrapped lines.
- isScrollOnBottom: Check if the scroll of an element is on the bottom.
- getVerticalScrollBarWidth: Get the default browser's vertical scrollbar width.
- isEllipsisActive: Checks if an element with "text-overflow: ellipsis;" has the ellipsis active and therefore has it's text truncated.
- cursorFocus: Focuses an input without scrolling.
- detectWrapped: Detect wrapped elements.
- maxNestingLevel: Gets the maximum nesting level of an element (or of the whole DOM if "document.body" is given).
- getScrollableAncestor: Get the first scrollable ancestor of an element.
- scrollToTop: Smoothly scrolls to the top of a scrollable element or the browser's window.
- downloadFile: Download a file without opening a new tab.
- isApiSupported: Check if a browser API is supported.
- isClient: Check if a function is called from client-side.

### Form Data

- buildFormData: Build a form data instance or object recursively.
- objToformData: Convert an object (array or JS POJO object) to a form data instance.

### Network

- newXHR: Get a new XMLHttpRequest or ActiveXObject object.
- checkNetwork: Check whether the network is reachable or not.
- waitForNetwork: Get a promise which resolves when the network is available. Will resolve immediately if the network is available.

### Query Strings

- buildQueryString: Construct a query string from an object or array.
- getRawURIFragment: Get the raw contents of the URI fragment (i.e. everything after the hash ("#") character).
- getDecodedURIFragment: Get the decoded contents of a URI fragment (i.e. everything after the hash ("#") character).
- appendEncodedJSONFragmentToURI: Appends an encoded JSON fragment to a URI.
- getDecodedJSONFromFragmentURI: Get the decoded JSON data stored in the URI fragment.
- parseMultiDimQueryStrings: Parse a multidimensional query string and returns an object with the parsed args.
- getMultiDimQueryStrings: Get the query string arguments of the current location in a multidimensional fashion.

### Swipe

- getPointerCoordinates: Get clientX and clientY values from a touch or mouse event.
- getDirection: Get the direction of a movement.
- getHorizontalDirection: Get the direction of a horizontal movement.
- getVerticalDirection: Get the direction of a vertical movement.

## Coming Soon

- RegExpHelper: a helper class for regular expressions that also provides RegExp for a lot of common situations, i.e validating a password, matching against IP addresses etc.
