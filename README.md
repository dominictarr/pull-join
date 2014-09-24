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
  ),
  pull.collect(function (err, ary) {
    console.log(ary)

    //[{left: 1, right: 10}
    //...

  })
)


```

## License

MIT
