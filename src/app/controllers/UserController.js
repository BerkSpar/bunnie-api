import * as Yup from 'yup';
import User from '../models/user';

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
}

export default new UserController();
