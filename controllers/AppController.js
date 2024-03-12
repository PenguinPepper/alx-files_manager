import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const AppController = {
  getStatus: (request, response) => {
    if (redisClient.isAlive() && dbClient.isAlive()) {
      response.status(200).send({ redis: true, db: true });
    } else {
      response.status(401).send({ redis: false, db: false });
    }
  },
  getStats: async (request, response) => {
    try {
      const users = await dbClient.nbUsers();
      const files = await dbClient.nbFiles();
      response.status(200).send({ users, files });
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default AppController;
