import dbClient from '../utils/db';

const UsersController = {
  postNew: (req, res) => {
    if !('email' in req.body) {
      res.status(400).send(new Error('Missing email'));
    }
  }
}
