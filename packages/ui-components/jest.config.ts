/* eslint-disable */
export default {
  displayName: 'ui-components',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/ui-components',
  preset: '../../jest.preset.js'
};
