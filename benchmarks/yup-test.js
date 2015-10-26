'use strict'

let fn = function (promise) {
  setTimeout(() => promise.resolve(), 100)
}

module.exports = {
  suite: 'test',
  name: 'Another test',
  test: {
    defer: true,
    fn
  }
}
