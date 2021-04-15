const app = require('../../src/app');

describe('\'words\' service', () => {
  it('registered the service', () => {
    const service = app.service('words');
    expect(service).toBeTruthy();
  });
});
