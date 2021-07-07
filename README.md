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

Run inside another terminal:

```bash
yarn storybook
```

or shorthand

```bash
yarn sb
```

This loads the stories from `./stories`.

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
