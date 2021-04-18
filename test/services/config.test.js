const app = require('../../src/app')

describe('\'config\' service', () => {
  it('registered the service', () => {
    const service = app.service('config')
    expect(service).toBeTruthy()
  })
})
