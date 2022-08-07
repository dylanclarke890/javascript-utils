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

Google maps and coordinate-related utilities.

## Maths

Maths utilities.

## Misc

A variety of different utilities such as uuid generation, validating passwords and currying functions.

## Object Handling

Utilities for working with objects and arrays, such as cloning and extending.

## Web

Utilities that work specifically in/with the browser.

## Coming Soon

- RegExpHelper: a helper class for regular expressions that also provides RegExp for a lot of common situations, i.e validating a password, matching against IP addresses etc.
