/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testPathIgnorePatterns: [
      "/node_modules/"
    ],
moduleNameMapper: {
        '\\.css$': '<rootDir>/src/styleMock.js',
      },
};