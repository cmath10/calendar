module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1"
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '^.+\\.ts$': 'ts-jest'
  },
}
