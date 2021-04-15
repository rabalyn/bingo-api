const app = require('../../src/app');

describe('\'bingos-words\' service', () => {
  it('registered the service', () => {
    const service = app.service('bingos-words');
    expect(service).toBeTruthy();
  });
});
