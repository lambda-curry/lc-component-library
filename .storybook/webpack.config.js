// https://github.com/storybookjs/storybook/issues/6188#issuecomment-727533276
const path = require('path');

const AppSourceDir = path.join(__dirname, '..', 'src');

module.exports = ({ config }) => {
  // Disable the Storybook internal-`.svg`-rule for components loaded from our app.
  const svgRule = config.module.rules.find((rule) => 'test.svg'.match(rule.test));
  svgRule.exclude = [AppSourceDir];
  svgRule.exclude = /\.svg$/;
  config.module.rules.push({
    test: /\.svg$/,
    use: ["@svgr/webpack", "url-loader"],
  });

  return config;
};