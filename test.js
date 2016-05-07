/*!
 * always-stream <https://github.com/hybridables/always-stream>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('fs')
var test = require('mukla')
var alwaysStream = require('./index')

test('should always return a function', function (done) {
  test.strictEqual(typeof alwaysStream(), 'function')
  test.strictEqual(typeof alwaysStream(123), 'function')
  test.strictEqual(typeof alwaysStream('str'), 'function')
  test.strictEqual(typeof alwaysStream(function () {}), 'function')
  test.strictEqual(typeof alwaysStream(true), 'function')
  test.strictEqual(typeof alwaysStream({ a: 'b' }), 'function')
  done()
})

test('should create a stream from any non-function input value', function (done) {
  var createStream = alwaysStream(1234)
  createStream()
    .on('data', function (val) {
      test.strictEqual(val, 1234)
    })
    .once('error', done)
    .once('end', done)

  var stringStream = alwaysStream('foo bar')
  stringStream()
    .on('data', function (val) {
      test.strictEqual(typeof val, 'string')
      test.strictEqual(val, 'foo bar')
    })
    .once('error', done)
    .once('end', done)
})

test('should create a stream from async function (fs.stat)', function (done) {
  var statFile = alwaysStream(fs.stat)

  statFile('./package.json')
    .on('data', function (stat) {
      test.strictEqual(typeof stat, 'object')
      test.ok(stat.mtime)
    })
    .once('error', done)
    .once('end', done)
})

test('should create a stream from sync function (fs.statSync)', function (done) {
  var statStream = alwaysStream(fs.statSync)

  statStream('./package.json').on('data', function (stat) {
    test.strictEqual(typeof stat, 'object')
    test.ok(stat.mtime)
    test.ok(stat.size)
  }).once('error', done).once('end', done)
})
