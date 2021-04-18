const app = require('../../src/app')

describe('\'users-rights\' service', () => {
  it('registered the service', () => {
    const service = app.service('users-rights')
    expect(service).toBeTruthy()
  })
})
