/* eslint-disable no-unused-vars */
exports.Liveusers = class Liveusers {
  constructor (options, app) {
    this.options = options || {}
    this.connections = []
    this.app = app
  }

  async find (_params) {
    return {
      total: this.connections.length,
      data: this.connections
    }
  }

  async get (id, _params) {
    return (this.connections.filter(x => x.id === id))[0]
  }

  async create ({ id, type, name }, _params) {
    const newConnection = {
      id,
      type,
      name
    }

    this.connections.push(newConnection)
    return newConnection
  }

  async remove (id) {
    const removedConnection = (this.connections.filter(x => x.id === id))[0]
    this.connections = this.connections.filter(x => x.id !== id)

    return removedConnection
  }
}
