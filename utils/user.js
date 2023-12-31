/*
 * Create a class named Users
 * The class connects to the database through DBclient
 * Add a method called addUser that will accept two parameters email and password:
 * The new user must be saved in the collection users:
 * email: same as the value received
 * password: SHA1 value of the value received
 * This method will return new user with only the email and the id (auto generated by MongoDB
 * Implement a method called search that will search the database collection users by email
 * if users is in databse it will return user document  else return -1
 *
 */

import dbClient from './db';
import crypto from 'crypto';

class Users {
  constructor() {
    this.client = dbClient;
  }

  async addUser(email, password) {
    const pwd = crypto.createHash('sha1').update(password).digest('hex');
    const db = this.client.db(this.client.database);
    try {
      const result = await db.collection('users').insertOne({email, 'password': pwd});
      return { 'id': result.insertedId, email };
    } catch (err) {
      console.error('There was a problem', err);
    }
  }

  async search(email) {
    try{
      const db = this.client.db(this.client.database);
      const user = await db.collection('users').findOne({ email });
      return user || -1;
    } catch (err) {
      console.error('There was a problem', err);
    }
  }
}

const user = new Users();
export default user;
