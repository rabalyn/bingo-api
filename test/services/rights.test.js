const app = require('../../src/app')

describe('\'rights\' service', () => {
  it('registered the service', () => {
    const service = app.service('rights')
    expect(service).toBeTruthy()
  })
})
