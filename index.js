'use strict'

let Benchmark = require('benchmark')
let fs = require('fs')
let _ = require('lodash')
let suites = []

// What to do when the suite is completed
let onComplete = function () {
  console.log(`Fastest is ${this.filter('fastest').pluck('name').join(', ')}`)

  if (suites.length) {
    suites.shift().suite.run()
  } else {
    process.exit()
  }
}

// Read all tests and include inside the suite
fs.readdirSync(`${__dirname}/benchmarks`)
.map(test => require(`./benchmarks/${test}`))
.forEach(test => {
  let suite = _.findWhere(suites, { name: test.suite })

  // Check if the suite already exists
  if (!suite) {
    suite = new Benchmark.Suite()

    // Listen for events
    suite.on('start', () => console.log(`# Starting suite ${test.suite}`))
    suite.on('complete', onComplete)
    suite.on('cycle', event => console.log(event.target.toString()))

    // Add the suite to the queue
    suites.push({ name: test.suite, suite })
  } else {
    suite = suite.suite
  }

  suite.add(test.name, test.test)
})

// Runs the first suite
suites.shift().suite.run()
