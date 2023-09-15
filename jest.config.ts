import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/test/',
    '<rootDir>/.eslintrc.js',
    '<rootDir>/jest.config.ts',
    '<rootDir>/coverage',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/test/',
    '<rootDir>/.eslintrc.js',
    '<rootDir>/jest.config.ts',
    '<rootDir>/coverage',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
    '@swc/jest': {
      isolatedModules: true,
    },
  },
};
export default config;
