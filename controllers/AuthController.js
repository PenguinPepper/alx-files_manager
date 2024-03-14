import crypto from 'crypto';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';
import { v4 as uuidv4 } from 'uuid';

const AuthController = {
  getConnect: async (request, response) => {
    const auth = request.headers['authorization'];
    if (!auth) return response.status(401).send{"error":"Unauthorized"};
    const [email, password] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
    const crypto.createHash('sha1').update(password).digest('hex');

    try {
      const foundUser = await dbClient.retrieveUser(email, password);
      if (!found) return response.status(401).send{"error":"Unauthorized"};
      else {
        const token = v4();
        await redisClient.set(`auth_${token}`, foundUser, 24 * 60 * 60);
	return response.status(200).send({"token": token})
      }
    } catch (err) {
      return (err);
    }
  },
  getDisconnect: async (request, response) => {
    const token = request.headers['X-Token'];
    try {
      const authenticated = await redisCient.get(token);
      if (!authenticated) return response.status(401).send{"error":"Unauthorized"};
      else {
        await redisClient.del(token);
        return response.status(204).send();
      }
    }    
  }
}

export default AuthController;
