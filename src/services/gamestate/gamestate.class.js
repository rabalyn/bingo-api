const { promisify } = require('util')
const redis = require('redis')
const { v4: uuidv4 } = require('uuid')

/* eslint-disable no-unused-vars */
exports.Gamestate = class Gamestate {
  constructor (options, redisUrl) {
    this.options = options || {}
    if (!redisUrl) {
      throw new Error('app missing')
    }
    this.redisClient = redis.createClient({ url: redisUrl })
    this.redisClient.getAsync = promisify(this.redisClient.get).bind(this.redisClient)
    this.redisClient.setAsync = promisify(this.redisClient.set).bind(this.redisClient)
    // this.redisClient.del('gamestate')

    this.games = this.redisClient.get('gamestate') || []
  }

  async find (params) {
    await this.loadGamestate()
    if (!params.query.bingoId) {
      return this.games
    }

    const bingoGamestate = this.games.filter(x => x.bingoId === params.query.bingoId)[0]
    if (params.query.$sort) {
      const sortBy = Object.keys(params.query.$sort)[0]
      const order = params.query.$sort[sortBy]
      if (order === 1) {
        return bingoGamestate.actions.sort((a, b) => {
          if (a[sortBy] > b[sortBy]) return 1
          return -1
        })
      } else {
        return bingoGamestate.actions.sort((a, b) => {
          if (a[sortBy] > b[sortBy]) return -1
          return 1
        })
      }
      // d
    } else {
      return bingoGamestate
    }
  }

  async get (id, params) {
    await this.loadGamestate()
    return this.games.filter(x => x.bingoId.toString() === id.toString())
  }

  async create (data, params) {
    if (!data.bingoId || !data.username) return null
    data.id = uuidv4()
    if (data.__id) delete data.__id

    await this.loadGamestate()

    if (data.user) {
      // user logged in, update history to ensure username is in the records
      for (let i = 0; i < this.games.length; i++) {
        this.games[i].actions = this.games[i].actions.map(x => {
          if (x.username === data.username) {
            x.user = data.user
            return x
          } else {
            return x
          }
        })
      }
    } else {
      for (let i = 0; i < this.games.length; i++) {
        this.games[i].actions = this.games[i].actions.map(x => {
          if (x.username === data.username) {
            if (x.user) delete x.user
            return x
          } else {
            return x
          }
        })
      }
    }

    let bingoGameIdx = null
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].bingoId === data.bingoId) {
        bingoGameIdx = i
        break
      }
    }

    if (bingoGameIdx === null) {
      this.games.push({
        bingoId: data.bingoId,
        actions: [data]
      })
    } else {
      this.games[bingoGameIdx].actions.push(data)
    }

    await this.redisClient.setAsync('gamestate', JSON.stringify(this.games))

    return data
  }

  async remove (id, params) {
    await this.loadGamestate()

    let removedGame
    for (let i = 0; i < this.games.length; i++) {
      if (this.games[i].bingoId === id) {
        removedGame = this.games.splice(i, 1)
        break
      }
    }

    await this.redisClient.setAsync('gamestate', JSON.stringify(this.games))

    return removedGame
  }

  async loadGamestate () {
    this.games = await this.redisClient.getAsync('gamestate') || '[]'
    this.games = JSON.parse(this.games)
  }
}
