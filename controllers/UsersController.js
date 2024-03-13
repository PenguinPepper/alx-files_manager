import crypto from 'crypto';
import dbClient from '../utils/db';

function hashPassword(password) {
  const hash = crypto.createHash('sha1');
  hash.update(password);
  return hash.digest('hex');
}

const UsersController = {
  postNew: async (request, response) => {
    if (!('email' in request.body)) {
      return response.status(400).send({ error: 'Missing email' });
    }
    if (!('password' in request.body)) {
      return response.status(400).send({ error: 'Missing password' });
    }

    try {
      const { email } = request.body;
      const userExists = await dbClient.findUser(email);
      if (userExists) return response.status(400).send({ error: 'Already exist' });
    } catch (err) {
      console.log(err);
    }
    try {
      const { email, password } = request.body;
      const body = {};
      body.email = email;
      if (password) body.password = hashPassword(password);
      const newUser = await dbClient.addUser(body);
      return response.status(201).send({ id: newUser, email });
    } catch (err) {
      return (err);
    }
  },
};

export default UsersController;
