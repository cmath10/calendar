module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1"
  },
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
}
