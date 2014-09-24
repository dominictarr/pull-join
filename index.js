var pull = require('pull-stream')
var BMap = require('binary-map')

module.exports = function (a, b, map) {

  //take two pull streams, and match their keys

  if(!map)
    map = function (key, left, right) {
      return {key: key, left: left, right: right}
    }

  var set = BMap()
  var deferred = pull.defer()

  pull(
    b,
    pull.drain(function (data) {
      set.add(data)
    }, function (err) {
      deferred.resolve(pull(
        a,
        pull.map(function (left) {
          var rightV = set.get(left.key)
          if(rightV) return map(left.key, left.value, rightV)
        }),
        pull.filter(Boolean)
      ))
    })
  )

  return deferred

}
