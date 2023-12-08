import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const AppController = {
  getStatus: (req, res) => {
    if (dbClient.isAlive && redisClient.isAlive) {
      res.status(200).json({ redis: true, db: true });
    }
  },

  getStats: async (req, res) => {
    const users = await dbClient.nbUsers()
      .catch((err) => console.error('Nothing happened beacuse', err));
    const files = await dbClient.nbFiles()
      .catch((err) => console.error('Nothing happened beacuse', err));
    res.status(200).json({ users, files });
  },
};

module.exports = AppController;
