const MongoClient = require('mongodb').MongoClient;
const config = require('config')
const Model = require('./model')
let db;

class Db {
	async connect() {
		if (!db) {
			db = await MongoClient.connect(config.db.url)
			this.Topics = new Model(db, 'topics')
		}
	}
}
 
module.exports = new Db();