const app = require('../../src/app')

describe('\'gamestate\' service', () => {
  it('registered the service', () => {
    const service = app.service('gamestate')
    expect(service).toBeTruthy()
  })
})
