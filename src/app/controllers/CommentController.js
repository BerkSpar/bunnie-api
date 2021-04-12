import * as Yup from 'yup';
import { Op } from 'sequelize';

import PostComment from '../models/postcomment';
import Post from '../models/post';

class CommentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      post_id: Yup.number().required(),
      content: Yup.string().required(),
    });

    let comment = {
      post_id: req.params.post_id,
      content: req.body.content,
    };

    if (!(await schema.isValid(comment))) {
      return res.status(400).json({ message: 'validation error' });
    }

    const post = await Post.findByPk(comment.post_id);

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    comment = await PostComment.create({
      user_id: req.user_id,
      post_id: comment.post_id,
      content: comment.content,
    });

    return res.status(200).json(comment);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      post_id: Yup.string().required(),
      comment_id: Yup.string().required(),
    });

    const body = {
      post_id: req.params.post_id,
      comment_id: req.params.comment_id,
    };

    if (!(await schema.isValid(body))) {
      return res.status(400).json({ message: 'validation error' });
    }

    const post = await Post.findByPk(body.post_id);

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    const comment = await PostComment.findOne({
      where: {
        [Op.and]: { user_id: req.user_id, id: body.comment_id },
      },
    });

    if (!comment) {
      return res.status(404).json({ message: 'comment not found' });
    }

    await comment.destroy();

    return res.status(200).json({ message: 'comment deleted successfully' });
  }

  async index(req, res) {
    const post_id = req.params.post_id;

    const comments = await PostComment.findAll({ where: { post_id } });

    return res.status(200).json(comments);
  }

  async find(req, res) {
    const schema = Yup.object().shape({
      post_id: Yup.string().required(),
      comment_id: Yup.string().required(),
    });

    const body = {
      post_id: req.params.post_id,
      comment_id: req.params.comment_id,
    };

    if (!(await schema.isValid(body))) {
      return res.status(400).json({ message: 'validation error' });
    }

    const post = await Post.findByPk(body.post_id);

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    const comment = await PostComment.findByPk(body.comment_id);

    if (!comment) {
      return res.status(404).json({ message: 'comment not found' });
    }

    return res.status(200).json(comment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      post_id: Yup.number().required(),
      comment_id: Yup.number().required(),
      content: Yup.string().required(),
    });

    const body = {
      post_id: req.params.post_id,
      comment_id: req.params.comment_id,
      content: req.body.content,
    };

    if (!(await schema.isValid(body))) {
      return res.status(400).json({ message: 'validation error' });
    }

    const post = await Post.findByPk(body.post_id);

    if (!post) {
      return res.status(404).json({ message: 'post not found' });
    }

    let comment = await PostComment.findByPk(body.comment_id);

    if (!comment) {
      return res.status(404).json({ message: 'comment not found' });
    }

    comment = await comment.update({
      content: body.content,
    });

    return res.status(200).json(comment);
  }
}

export default new CommentController();
