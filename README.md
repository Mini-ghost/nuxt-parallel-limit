
# nuxt-parallel-limit

> Run multiple fetch with limited concurrency

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

## Installation

Install and add `nuxt-parallel-limit` to your `nuxt.config`.

```bash
npm install -D nuxt-parallel-limit
yarn add -D nuxt-parallel-limit
pnpm add -D nuxt-parallel-limit
```

```ts
export default defineNuxtConfig({
  modules: ['nuxt-parallel-limit'],
})
```

## Configuration

You can pass configuration to the module in the `nuxt.config` like following:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-parallel-limit'],
  parallelLimit: {
    patterns: [
      {
        pattern: 'https://jsonplaceholder.typicode.com',
        limit: 2
      }
    ]
  },
})
```

`pattern`:

- Type: `string`
- Details: The `pattern` specifies a regular expression the fetch url should match. If the fetch url matches the specified `pattern`, the fetch will be limited by the `limit` attribute.

`limit`:

- Type: `number`
- Details: Limit the maximum number of concurrent.

## Development

- Clone this repository
- Install dependencies using pnpm install
- Stub module with `pnpm dev:prepare`
- Run pnpm dev to start playground in development mode

## License

Made with ❤️

Published under the [MIT License](./LICENCE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-parallel-limit?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-parallel-limit
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-parallel-limit?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-parallel-limit
[license-src]: https://img.shields.io/npm/l/@nuxtjs/color-mode.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@nuxtjs/color-mode
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
