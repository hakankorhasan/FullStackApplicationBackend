module.exports = async function(req, res) {
    const postId = req.param('id')

    try {
        await FeedItem.destroy({
            post: postId,
            user: req.session.userId
        })
        res.end()
    } catch (err) {
        res.serverError(err.toString())
    }
}