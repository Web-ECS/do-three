module.exports = function (wallaby) {
  return {
    files: [
      'package.json',
      'src/**/*.ts',
    ],
    tests: [
      'test/**/*.test.ts'
    ],
    env: {
      type: 'node'
    },
    workers: { restart: true }
  };
};