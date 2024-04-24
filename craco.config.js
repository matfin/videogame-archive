const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@models': path.resolve(__dirname, 'src/models/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@state': path.resolve(__dirname, 'src/state/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@views': path.resolve(__dirname, 'src/views/'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@components(.*)$': '<rootDir>/src/components/$1',
        '^@models(.*)$': '<rootDir>/src/models/$1',
        '^@services(.*)$': '<rootDir>/src/services/$1',
        '^@state(.*)$': '<rootDir>/src/state/$1',
        '^@styles(.*)$': '<rootDir>/src/styles/$1',
        '^@utils(.*)$': '<rootDir>/src/utils/$1',
        '^@views(.*)$': '<rootDir>/src/views/$1',
      },
    },
  },
};
