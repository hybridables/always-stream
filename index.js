/*!
 * always-stream <https://github.com/hybridables/always-stream>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

module.exports = function alwaysStream (val, opts, Promize) {
  if (typeof val === 'function') {
    return utils.callback2stream(val, opts, Promize)
  }
  return function () {
    return utils.value2stream(val, opts, Promize)
  }
}
