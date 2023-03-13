module.exports = async function(req, res) {
    console.log("hey " + req.param('id'))

    const postId = req.param('id')

    await Comment.create({
        text: req.body.text,
        post: postId,
        user: req.session.userId
    })

    res.redirect('/post/' + postId)
}