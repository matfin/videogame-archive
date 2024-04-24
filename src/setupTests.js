import '@testing-library/jest-dom';

global.crypto = {
  randomUUID: () => 'abcd-1234',
};
