import * as Yup from 'yup';
import PostComment from '../models/postcomment';
import Post from '../models/post';

class CommentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      post_id: Yup.number().required(),
      content: Yup.string().required(),
    });

    const comment = {
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

    //TODO: Get user id from auth header

    await PostComment.create({
      user_id: 0,
      post_id: comment.post_id,
      content: comment.comment,
    });

    return res.status(200).json({ message: 'comment created successfully' });
  }
}

export default new CommentController();
