import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const AppController = {
  getStatus: (req, res) => {
    if (dbClient.isAlive && redisClient.isAlive) {
      res.status(200).send({ "redis": true, "db": true });
    }
  },

  getStats: (req, res) => {
    const users = dbClient.nbUsers().catch((err) => console.error('Nothing happened beacuse', err));
    const files = dbClient.nbFiles().catch((err) => console.error('Nothing happened beacuse', err));
    res.status(200).send({"users": users, "files": files });
  }
}

module.exports = AppController;
