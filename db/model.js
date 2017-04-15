const ObjectId = require('mongodb').ObjectID

class Model {
  constructor (db, collectionName) {
    this.name = collectionName
    this.db = db
  }

  async upvote (id) { await this.vote(id, { up: 1, down: 0 }) }
  async downvote (id) { await this.vote(id, { up: 0, down: 1 }) }
  async vote (id, voteOptions) {
    let query = { _id: ObjectId(id) }
    let result = null

    try {
      const topic = await this.db.collection(this.name).findOne(query)
      let topicToUpdate = this.calculateNewVotes(topic, voteOptions)

      result = await this.db.collection(this.name).updateOne(query, topicToUpdate)
    } catch (ex) { throw new Error('Db vote error') }

    return result
  }

  calculateNewVotes (topic, vote) {
    return {
      title: topic.title,
      upvotes: topic.upvotes + vote.up,
      downvotes: topic.downvotes + vote.down,
      score: topic.upvotes - topic.downvotes
    }
  }

  async findAll () {
    let topics = []
    try {
      const result = await this.db.collection(this.name)
        .find()
        .sort({ score: -1 })

      topics = result.toArray()
    } catch (ex) { throw new Error('Db findAll error') }

    return topics
  }
}

module.exports = Model
