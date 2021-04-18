const app = require('../../src/app')

describe('\'words-topics\' service', () => {
  it('registered the service', () => {
    const service = app.service('words-topics')
    expect(service).toBeTruthy()
  })
})
