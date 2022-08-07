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

## Web

Utilities that work specifically in/with the browser.

## Coming Soon

- RegExpHelper: a helper class for regular expressions that also provides RegExp for a lot of common situations, i.e validating a password, matching against IP addresses etc.
