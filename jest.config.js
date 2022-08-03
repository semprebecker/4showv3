module.exports = {
  roots: [
    '<rootDir>',
    '<rootDir>/tests/lambda-functions',
    '<rootDir>/tests/cdk',
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    'backend/application/lambda-functions/**/*.ts',
    '!cdk.out/**/*',
    '!bin/**/*',
    '!esbuild.ts',
    '!backend/application/lambda-functions/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['./jest.setup.ts'], displayName: 'node', testEnvironment: 'node', testMatch: ['**/*.test.ts']
};
