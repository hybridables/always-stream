/*!
 * always-stream <https://github.com/hybridables/always-stream>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

/**
 * > Create a stream from any value.
 *
 * **Example**
 *
 * ```js
 * var fs = require('fs')
 * var toStream = require('always-stream')
 *
 * var numberStream = toStream(123)
 * numberStream().on('data', function (val) {
 *   console.log(val) // => 123
 * })
 * var stringStream = toStream('str foo')
 * stringStream().on('data', function (val) {
 *   console.log(val) // => 'str foo'
 * })
 *
 * var readFile = toStream(fs.readFile)
 * readFile('package.json', 'utf8')
 *   .on('data', function (val) {
 *     var json = JSON.parse(val)
 *     console.log(json.name) // => 'always-stream'
 *   })
 *   .once('error', console.error)
 *   .once('end', console.error)
 *
 * // or sync functions
 * var statFile = toStream(fs.statSync)
 * statFile('package.json')
 *   .on('data', function (stats) {
 *     console.log(stats) // => stat object
 *   })
 *   .once('error', console.error)
 *   .once('end', console.error)
 *
 * // also works for native functions
 * // like JSON.parse and JSON.stringify
 * // by respect optional arguments
 * var stringifyStream = toStream(JSON.stringify)
 * stringifyStream({ foo: 'bar' }, null, 2)
 *   .on('data', function (val) {
 *     console.log(val) // => '{\n  "foo": "bar"\n}'
 *   })
 *   .once('error', console.error)
 * ```
 *
 * @param  {Mixed} `val` Any type of value.
 * @param  {Object|Function=} `[opts]` Directly passed to [value2stream][], [callback2stream][] and [through2][].
 * @param  {Function} `[Promize]` Promise constructor to be used when no support for native Promise. Can be 2nd argument.
 * @return {Function} That when executed, returns `TransformStream`, using [through2][]
 * @api public
 */

module.exports = function alwaysStream (val, opts, Promize) {
  if (typeof val === 'function') {
    return utils.callback2stream(val, opts, Promize)
  }
  return function () {
    return utils.value2stream(val, opts, Promize)
  }
}
