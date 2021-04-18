const app = require('../../src/app')

describe('\'bingos\' service', () => {
  it('registered the service', () => {
    const service = app.service('bingos')
    expect(service).toBeTruthy()
  })
})
