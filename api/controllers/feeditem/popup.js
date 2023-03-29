module.exports = async function (req, res) {

    const postId = req.param('id');
  
    const post = await Post.findOne({
      id: postId,
      user: req.session.userId
    });
  
    if (!post) {
      return res.badRequest('You cannot like this post.');
    }
  
    await Like.create({
      post: postId,
      user: req.session.userId,
    });
  
    const postUser = await User.findOne({id: post.user});
  
    if (postUser.id !== req.session.userId) {
      await Notification.create({
        user: postUser.id,
        type: 'like',
        message: `Your post has been liked by ${req.session.fullName}`,
        post: postId,
        fromUser: req.session.userId
      });
    }
  
    res.ok();
  }
  