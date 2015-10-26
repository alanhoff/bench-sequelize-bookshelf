'use strict'

let fn = function (promise) {
  setTimeout(() => promise.resolve(), 100)
}

module.exports = {
  suite: 'test',
  name: 'First test',
  test: {
    defer: true,
    fn
  }
}
