# ignite-react-app CLI

A CLI for ignite-react-app (ir-app).

This CLI tool in not a replacement for `create-react-app`. In fact it requires that `create-react-app` be installed globally on your machine.

`ignite-react-app` extends `create-react-app` by adding a boilerplate and generators

### Quick Example

```
$ npm install -g ignite-react-app
$ ir-app new my-awesome-app
  ( The `Adam` boilerplate is the default )
$ cd my-app
$ ir-app component Comment
  ( Generates a new component => Comment )
$ ir-app container Comment
  ( Generates a new container => CommentContainer )
$ ir-app redux Comment
  ( Generates a new redux => CommentRedux )
$ ir-app saga Comment
  ( Generates a new saga => CommentSagas )
$ ir-app g comp cont redux saga Comment
  ( Generates a new component => Comment )
  ( Generates a new container => CommentContainer )
  ( Generates a new redux => CommentRedux )
  ( Generates a new saga => CommentSagas )
```

You can also generate layouts:
```
$ ir-app layout Users
```
## :plate_with_cutlery: Boilerplates :plate_with_cutlery:

| Name | Description |
|------|-------------|
| [ir-app-boilerplate-adam](https://github.com/bjonamu/ir-app-boilerplate-adam) | Redux & Sagas |
| [ir-app-boilerplate-bob](https://github.com/bjonamu/ir-app-boilerplate-bob) | GraphQL & Apollo |


```
$ ir-app new my-awesome-app -b <ir-boilerplate>
```

## :heart: Special Thanks :heart:

- Facebook (<https://github.com/facebook>) for building the incredible create-react-app
- Infinite Red, Inc. (<https://github.com/infinitered>) for the inspiration

## Backers/Contrbutors

Contributions are very welcome

# License

MIT - see LICENSE

