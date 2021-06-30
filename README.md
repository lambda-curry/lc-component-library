# Installing the Component Library

- `yarn install @lambdacurry/component-library`
- If using typescript, you'll want to install the @types listed in our peer-dependencies.
- To get the necessary base styles you'll want to import the css file at `node_modules/@lambdacurry/component-library/dist/styles/index.css`
- Some SSR (Gatsby) sites do not load the component styles for some reason, so you'll want to use the css file at `node_modules/@lambdacurry/component-library/dist/all.css` instead of the index.css file.

# Theming

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

# How to deploy to Github.io

Checkout the `docs` branch. Merge in the latest code you would like to deploy. Push up the latest code to the `docs` branch. Github will automatically build and deploy static build to https://lambda-curry.github.io/lc-component-library.

# How to deploy a beta version

For internal Lambda Curry organization people, there is a document on this [here](https://lambdacurry.atlassian.net/wiki/spaces/LC/pages/1006272513/Publishing+a+beta+NPM+Package).

# ESbuild

We're utilizing esbuild for the builds: https://esbuild.github.io/
A few things to note:

- Currently the postcss.config.js is using a new format (utilized by storybook), so we are replicating the config within esbuild.msj. Updates for postcss should be done in both places for now.
- I copied the source code for the esbuild postcss and svgr plugins and using them within our project (`esbuild.postcss.js` and `esbuild.svgr.js`). In order to get SVGs working, we convert them all to javascript files with SVGR, but the imports in the compiled javascript files were still expecting `.svg`, so `esbuild.svgimport.js` is a custom plugin that rewrites those imports to their expected `.js` file.

### Storybook

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

### building

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`. (tests are a good idea, we should add them sometime)

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.
(we are currently not utilizing these, except for prettier)

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

#### Setup Files

This is the folder structure we set up for you:

```txt
/example
  index.html
  index.tsx       # test your component here in a demo app
  package.json
  tsconfig.json
/src
  index.tsx       # EDIT THIS
/test
  blah.test.tsx   # EDIT THIS
/stories
  Thing.stories.tsx # EDIT THIS
/.storybook
  main.js
  preview.js
.gitignore
package.json
README.md         # EDIT THIS
tsconfig.json
```

#### React Testing Library

We do not set up `react-testing-library` for you yet, we welcome contributions and documentation on this.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.
