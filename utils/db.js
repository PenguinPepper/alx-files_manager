import { MongoClient } from 'mongodb';

class DBSClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.host}:${this.port}/${this.database}`;
    this.client = new MongoClient(this.url);
  }

  async init() {
    try {
      await this.client.connect();
    } catch (err) {
      console.error('There is a problem. This is the problem: ', err);
      throw err;
    }
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const db = this.client.db(this.database);
    const users = db.collection('users');
    try {
      const usersNum = await users.countDocuments();
      return parseInt(usersNum, 10);
    } catch (err) {
      return ('There is a problem. This is the problem: ', err);
    }
  }

  async nbFiles() {
    const db = this.client.db(this.database);
    const files = db.collection('files');
    try {
      const fileNum = await files.countDocuments();
      return parseInt(fileNum, 10);
    } catch (err) {
      return ('There is a problem. This is the problem: ', err);
    }
  }
}

const dbClient = new DBSClient();
dbClient.init().catch((err) => console.error('It didnt connect because: ', err));
module.exports = dbClient;
