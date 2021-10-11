# The Lambda Curry Component Library

## Installing the Component Library

```sh
yarn add @lambdacurry/component-library
```

### Notes about installation and usage

- If using TypeScript, you'll want to install the `@types` listed in our peer-dependencies.

- To get the necessary base styles you'll want to import the `index.css` file.

  JavaScript:

  ```js
  import '@lambdacurry/component-library/dist/styles/index.css';
  ```

  CSS:

  ```css
  @import '~@lambdacurry/component-library/dist/styles/index.css';
  ```

- Some SSR (Gatsby) sites do not load the component styles for some reason, so you'll want to use the CSS `all.css` file (instead of the `index.css` file).
  JavaScript:

  ```js
  import '@lambdacurry/component-library/dist/all.css';
  ```

  CSS:

  ```css
  @import '~@lambdacurry/component-library/dist/all.css';
  ```

## Theming

The component library uses CSS custom properties to handle theming. To make this work with Tailwind's `opacity` utilities, the values of your theme variables must be in RGB format. Our configuration handles wrapping the values in the `rgba()` function, so you only need to provide the comma-separate RGB values. For example to override the `black` color variable, you would do it like this:

```css
.my-theme-root {
  --lc-color-black: 40, 45, 48; /* This is equivalent to the hex value #282D30 */
}
```

Here is the full list of CSS custom properties that we currently provide for theming (along with their default values):

```css
:root {
  --lc-color-black: 0, 0, 0;
  --lc-color-white: 255, 255, 255;

  --lc-color-gray-lightest: 245, 246, 250;
  --lc-color-gray-lighter: 226, 226, 226;
  --lc-color-gray-light: 189, 189, 189;
  --lc-color-gray: 160, 165, 186;
  --lc-color-gray-dark: 112, 112, 112;
  --lc-color-gray-darker: 64, 64, 64;

  --lc-color-primary: 49, 130, 206;
  --lc-color-primary-dark: 44, 82, 130;

  --lc-color-accent: 237, 100, 166;
  --lc-color-accent-dark: 184, 50, 128;

  --lc-color-success: 72, 187, 120;
  --lc-color-success-dark: 47, 133, 90;

  --lc-color-warning: 237, 137, 54;
  --lc-color-warning-dark: 221, 107, 32;

  --lc-color-danger: 229, 62, 62;
  --lc-color-danger-dark: 197, 48, 48;

  --lc-color-active: 91, 208, 103;
}
```

## Documentation

To view the documentation for the component library go to https://component-library.lambdacurry.dev/. (The documentation automatically deploys when new updates are merged to the `master` branch.)

## How to deploy a beta version

For internal Lambda Curry organization people, there is a document on this [here](https://lambdacurry.atlassian.net/wiki/spaces/LC/pages/1006272513/Publishing+a+beta+NPM+Package).

## ESbuild

We're utilizing esbuild for the builds: https://esbuild.github.io/

A few things to note:

- Currently the `postcss.config.js` is using a new format (utilized by storybook), so we are replicating the config within `esbuild.msj`. Updates for PostCSS should be done in both places for now.
- We copied the source code for the esbuild PostCSS and SVGR plugins. We are using them within our project (`esbuild.postcss.js` and `esbuild.fileImport.js`). In order to get SVGs (and other image assets) working, we convert them all to javascript files with SVGR, but the imports in the compiled JavaScript files were still expecting `.svg`, so `esbuild.fileImport.js` is a custom plugin that rewrites those imports to their expected `.js` file.

## TypeScript

The `tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Storybook

Learn the nx commands to run storybook and e2e cypress testing for it.

> NOTE: Stories should reference the components as if using the library, similar to the example playground. This means importing from the root project directory. This has been aliased in the tsconfig and the storybook webpack config as a helper.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.
(we are currently not utilizing these, except for prettier)

## Building

To do a one-off build, use `yarn build`.

## Testing

To run tests, use `yarn test`. (Tests are a good idea, we should add them sometime.)

### Jest

Jest tests are set up to run with `yarn test`.

### React Testing Library

We do not set up `react-testing-library` for you yet, we welcome contributions and documentation on this.

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Extensible Build Framework**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@testworkspace/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
