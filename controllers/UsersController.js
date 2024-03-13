import dbClient from '../utils/db';
import crypto from 'crypto';

function hashPassword(password) {
  const hash = crypto.createHash('sha1');
  hash.update(password);
  return hash.digest('hex');
}

const UsersController = {
  postNew: async (request, response) => {
    if (!('email' in request.body)) {
      response.status(400).send({"error":"Missing email"});
    }
    else if (!('password' in request.body)) {
     response.status(400).send({"error":"Missing password"});
    }
    try {
      const { email, password } = request.body;
      const userExists = await dbClient.findUser(email);
      if (userExists.includes(email)) response.status(400).send({"error":"Already exist"});
    } catch (err) {
      console.log(err);
    }
    try{
      const { email, password } = request.body;
      let body = {};
      body["email"] = email;
      body["password"] = hashPassword(password);
      const newUser = await dbClient.addUser(body);
      response.status(201).send(newUser);
    } catch (err) {
      console.log(err);
    }

  },
};

export default UsersController;
