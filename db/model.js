class Model {
  constructor(db, collectionName) {
    this.name = collectionName;
    this.db = db;
  }

  async downvote(slug) {
    await this.vote(slug, { up: 0, down: 1 })
  }

  async upvote(slug) {
    await this.vote(slug, { up: 1, down: 0 })
  }

  async vote(slug, voteOptions) {
    let query = { slug: slug }
    const result = null

    try {
      const topicToUpdate = await this.db.collection(this.name).findOne(query)

      topicToUpdate.plusvotes = topicToUpdate.plusvotes + voteOptions.up
      topicToUpdate.minusvotes = topicToUpdate.minusvotes + voteOptions.down
      topicToUpdate.score = topicToUpdate.plusvotes - topicToUpdate.minusvotes

      result = await this.db.collection(this.name).updateOne(query, topicToUpdate)
    }
    catch (ex) {
      throw new Error('Db vote error')
    }
    finally {
      return result;
    }
  }

  async findAll() {
    let topics = []
    try {
      const result = await this.db.collection(this.name)
        .find()
        .sort({ score: 1 })

      topics = result.toArray()
    }
    catch (ex) {
      throw new Error('Db findAll error')
    }
    finally {
      return topics
    }
  }
}

module.exports = Model;