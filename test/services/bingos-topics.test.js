const app = require('../../src/app')

describe('\'bingos-topics\' service', () => {
  it('registered the service', () => {
    const service = app.service('bingos-topics')
    expect(service).toBeTruthy()
  })
})
