# Emoji of the X Scraper

The scraper that reads the [official list of emojis](https://unicode.org/emoji/charts/full-emoji-list.html) and randomly picks which is going to be the emoji of the Day / Week / Month!

Consumed by the sister repo, [Emoji of the X].

[emoji of the x]: https://github.com/jmagrippis/emoji-of-the-x 'It has been a while since I last went without a monorepo design'

## Tech used

- [Apollo Server] to serve the GraphQL endpoint
- [GraphQL Codegen] for [Typescript] type definitions
- [Postgres] as the database
- [Knex], only for running database migrations
- [Heroku] for deployment and task scheduling

[apollo server]: https://www.apollographql.com/docs/apollo-server/ 'the best way to build a production-ready, self-documenting GraphQL API that can use data from any source'
[graphql codegen]: https://graphql-code-generator.com/ 'because no-one wants to type GraphQL schemas AND Typescript definitions'
[typescript]: https://www.typescriptlang.org/ 'Javascript that scales'
[postgres]: https://www.postgresql.org/ '30% of engineering problems would not exist if everyone just went with Postgres'
[knex]: https://www.postgresql.org/ 'I would not actually use it as a query builder'
[heroku]: https://www.heroku.com/ 'Pricey but versatile cloud provider'
