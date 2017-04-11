class Model {
	constructor(db, collectionName) {
		this.name = collectionName;
		this.db = db;
	}

	async findAll() {
		const result = await this.db.collection(this.name)
                      .find()
                      .sort({ score : 1});
		if (!result) {
			throw new Error('Db findAll error');
		}
		return result.toArray();
	}
}
 
module.exports = Model;