# Vue Recipe App

This project is a Vue 3 application developed with Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## JSON Server Setup for Data Persistence

To enable data persistence, this project utilizes JSON Server. Follow these steps to set it up:

1. Install JSON Server globally:

   ```sh
   npm install -g json-server
   ```

2. Run JSON Server with the following command:
   ```sh
   npx json-server db.json -w
   ```

This command will start JSON Server and watch the `db.json` file for changes, allowing you to interact with the data through RESTful endpoints.

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile, and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Type Support for `.vue` Imports in TS

To enable type support for `.vue` imports in TypeScript, we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we use [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.
