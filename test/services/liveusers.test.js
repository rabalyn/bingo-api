const app = require('../../src/app');

describe('\'liveusers\' service', () => {
  it('registered the service', () => {
    const service = app.service('liveusers');
    expect(service).toBeTruthy();
  });
});
