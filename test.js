

var join = require('./')
var pull = require('pull-stream')
var assert = require('assert')

require('interleavings').test(function (async) {
  pull(
    join(
      pull(pull.values([
        {key: 'a', value: 1},
        {key: 'b', value: 2},
        {key: 'c', value: 3},
        {key: 'd', value: 4}
      ]), async.through()),
      pull(pull.values([
        {key: 'a', value: 10},
        {key: 'b', value: 20},
        {key: 'c', value: 30},
        {key: 'd', value: 40}
      ]), async.through())
    ),
    async.through(),
    pull.collect(function (err, ary) {
      if(err) throw err
      assert.deepEqual(
        ary,
        [ { key: 'a', left: 1, right: 10 },
          { key: 'b', left: 2, right: 20 },
          { key: 'c', left: 3, right: 30 },
          { key: 'd', left: 4, right: 40 } ]
      )

      async.done()
    })
  )
})
