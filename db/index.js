const MongoClient = require('mongodb').MongoClient
const config = require('config')
const Model = require('./model')
let db = null

class Db {
  async connect () {
    if (!db) {
      db = await MongoClient.connect(config.db.url)
      this.setModel('topics') // can this be moved into the routers to allow us to get different topics
    }
  }

  setModel (name) {
    this.Topics = new Model(db, name)
  }
}

module.exports = new Db()
