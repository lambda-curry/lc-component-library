module.exports = {
  moduleNameMapper: {
    "\\.svg": "<rootDir>/test/__mocks__/svgrMock.ts",
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
  },
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js"
  ]
};
