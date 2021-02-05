import * as Yup from 'yup';
import { Op } from 'sequelize';

import Post from '../models/post';
import PostComment from '../models/postcomment';

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

    const post = await Post.create({
      user_id: req.user_id,
      content,
      image_url,
    });

    return res.status(200).json(post);
  }

  async delete(req, res) {
    const id = req.params.post_id;

    if (!id) {
      return res.status(400).json({ message: 'validation error' });
    }

    const post = await Post.findOne({
      where: {
        [Op.and]: [{ id }, { user_id: req.user_id }],
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    const comments = await PostComment.findAll({ where: { post_id: post.id } });

    comments.forEach(async (comment) => {
      await comment.destroy();
    });

    await post.destroy();

    return res.status(200).json({ message: 'post deleted successfully' });
  }

  async find(req, res) {
    const id = req.params.post_id;

    const post = await Post.findOne({
      where: {
        [Op.and]: { id, user_id: req.user_id },
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    return res.status(200).json(post);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      content: Yup.string().required(),
      image_url: Yup.string().notRequired(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'validation error' });
    }

    const { content, image_url } = req.body;
    const id = req.params.post_id;

    let post = await Post.findOne({
      where: {
        [Op.and]: [{ id }, { user_id: req.user_id }],
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    post = await post.update({
      content,
      image_url,
    });

    return res.status(200).json(post);
  }
}

export default new PostController();
