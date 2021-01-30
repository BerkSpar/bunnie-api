import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/user';

require('dotenv/config');

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      last_name: Yup.string().required(),
      mobile: Yup.string().required(),
      username: Yup.string().required(),
      password: Yup.string().required(),
      email: Yup.string().required(),
      bio: Yup.string().required(),
      is_public: Yup.bool().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'validation error' });
    }

    const user = await User.findOne({ where: { username: req.body.username } });

    if (user) {
      return res
        .status(400)
        .json({ message: 'there is another user with this username' });
    }

    const {
      name,
      last_name,
      mobile,
      username,
      password,
      email,
      bio,
      is_public,
    } = req.body;

    await User.create({
      name,
      last_name,
      mobile,
      username,
      password,
      email,
      bio,
      is_public,
    });

    return res.status(200).json({ message: 'user added successfully' });
  }

  async signIn(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'validation error' });
    }

    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    return res
      .status(200)
      .json({ token, expires_in: process.env.JWT_EXPIRE_TIME });
  }
}

export default new UserController();
