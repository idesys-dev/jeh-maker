module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{vue,js,jsx,ts,tsx}', '!**/node_modules/**'],
  coverageReporters: ['lcov', 'text-summary']
}
