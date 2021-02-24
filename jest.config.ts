export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>/tests'],
  testEnvironment: 'node',
  transform: { '^.+\\.ts?$': 'ts-jest' }
};
