import * as Yup from 'yup';
import Post from '../models/post';

class PostController {
  async store(req, res) {
    const schema = Yup.object().shape({
      content: Yup.string().required(),
      image_url: Yup.string().notRequired(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'validation error' });
    }

    const { content, image_url } = req.body;

    //TODO: Get user id from auth header

    await Post.create({
      user_id: 0,
      content,
      image_url,
    });

    return res.status(200).json({ message: 'post added successfully' });
  }
}

export default new PostController();
