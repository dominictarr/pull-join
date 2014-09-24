# pull-join

perform an SQL-like join on two pull streams.

## example

Each stream must have items of form `{key: key, value: value}`
Both streams are loaded into memory until the first one finishes.

``` js
var join = require('pull-join')

pull(
  join(
    pull.values([
      {key: 'a', value: 1},
      {key: 'b', value: 2},
      {key: 'c', value: 3},
      {key: 'd', value: 4}
    ]),
    pull.values([
      {key: 'a', value: 10},
      {key: 'b', value: 20},
      {key: 'c', value: 30},
      {key: 'd', value: 40}
    ])
    //optional third argument
    //, map(key, left, right)
  ),
  pull.collect(function (err, ary) {

    console.log(ary)
    //[{key: 'a', left: 1, right: 10}
    //...

  })
)
```

## pull(left, right, map(key, leftV, rightV)?)

Join the values from two streams. Each item in the `left` and `right`
pull streams must be of the form `{key, value}`.
the right stream will be buffered entirely, and then the keys
coming in on the right stream will be matched to it. If you know
which stream will less data, make that the left one.

`map` is a function that returns a single value.
this will be the output of the stream. by default,
map will return an object like `{key, left, right}`

## License

MIT
