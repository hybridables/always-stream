# [always-stream][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Create stream from any value - function, array, string, buffer, promise, number, object and etc. Always returns a function that returns Transform Stream, using [through2][].

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

**Note:** This is just a thin wrapper around [callback2stream][] and [value2stream][].

## Install
```
npm i always-stream --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const alwaysStream = require('always-stream')
```

### [alwaysStream](index.js#L66)
> Create a stream from any value.

**Params**

* `val` **{Mixed}**: Any type of value.    
* `[opts]` **{Object|Function=}**: Directly passed to [value2stream][], [callback2stream][] and [through2][].    
* `[Promize]` **{Function}**: Promise constructor to be used when no support for native Promise. Can be 2nd argument.    
* `returns` **{Function}**: That when executed, returns `TransformStream`, using [through2][]  

**Example**

```js
var fs = require('fs')
var toStream = require('always-stream')

var numberStream = toStream(123)
numberStream().on('data', function (val) {
  console.log(val) // => 123
})
var stringStream = toStream('str foo')
stringStream().on('data', function (val) {
  console.log(val) // => 'str foo'
})

var readFile = toStream(fs.readFile)
readFile('package.json', 'utf8')
  .on('data', function (val) {
    var json = JSON.parse(val)
    console.log(json.name) // => 'always-stream'
  })
  .once('error', console.error)
  .once('end', console.error)

// or sync functions
var statFile = toStream(fs.statSync)
statFile('package.json')
  .on('data', function (stats) {
    console.log(stats) // => stat object
  })
  .once('error', console.error)
  .once('end', console.error)

// also works for native functions
// like JSON.parse and JSON.stringify
// by respect optional arguments
var stringifyStream = toStream(JSON.stringify)
stringifyStream({ foo: 'bar' }, null, 2)
  .on('data', function (val) {
    console.log(val) // => '{\n  "foo": "bar"\n}'
  })
  .once('error', console.error)
```

## Related
* [callback2stream](https://www.npmjs.com/package/callback2stream): Transform sync, async or generator function to Stream. Correctly handle errors. [homepage](https://github.com/hybridables/callback2stream)
* [letta](https://www.npmjs.com/package/letta): Let's move to promises! Drop-in replacement for `co@4` (passing 100% tests) [homepage](https://github.com/hybridables/letta)
* [limon](https://www.npmjs.com/package/limon): The pluggable JavaScript lexer. Limon = Lemon. | [homepage](https://github.com/limonjs/limon)
* [postjson](https://www.npmjs.com/package/postjson): Transforming JSON with plugins. | [homepage](https://github.com/postjson/postjson)
* [promise2stream](https://www.npmjs.com/package/promise2stream): Transform ES2015 Promise to Stream - specifically, Transform Stream… [more](https://www.npmjs.com/package/promise2stream) | [homepage](https://github.com/hybridables/promise2stream)
* [relike](https://www.npmjs.com/package/relike): Simple promisify a callback-style function with sane defaults. Support promisify-ing sync functions. | [homepage](https://github.com/hybridables/relike)
* [value2stream](https://www.npmjs.com/package/value2stream): Transform any value to stream. Create stream from any value - string,… [more](https://www.npmjs.com/package/value2stream) | [homepage](https://github.com/hybridables/value2stream)

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/hybridables/always-stream/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[callback2stream]: https://github.com/hybridables/callback2stream
[through2]: https://github.com/rvagg/through2
[value2stream]: https://github.com/hybridables/value2stream

[npmjs-url]: https://www.npmjs.com/package/always-stream
[npmjs-img]: https://img.shields.io/npm/v/always-stream.svg?label=always-stream

[license-url]: https://github.com/hybridables/always-stream/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/always-stream.svg

[downloads-url]: https://www.npmjs.com/package/always-stream
[downloads-img]: https://img.shields.io/npm/dm/always-stream.svg

[codeclimate-url]: https://codeclimate.com/github/hybridables/always-stream
[codeclimate-img]: https://img.shields.io/codeclimate/github/hybridables/always-stream.svg

[travis-url]: https://travis-ci.org/hybridables/always-stream
[travis-img]: https://img.shields.io/travis/hybridables/always-stream/master.svg

[coveralls-url]: https://coveralls.io/r/hybridables/always-stream
[coveralls-img]: https://img.shields.io/coveralls/hybridables/always-stream.svg

[david-url]: https://david-dm.org/hybridables/always-stream
[david-img]: https://img.shields.io/david/hybridables/always-stream.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg