module.exports = async function (req, res) {
    const userId = req.session.userId
    const allPosts = []

    const feedItems = await FeedItem.find({user: userId})
        .sort('postCreatedAt DESC')
        .populate('post')
        .populate('postOwner')

    feedItems.forEach(fi => {
        if(fi.post) {
            fi.post.user = fi.postOwner
            fi.post.canDelete = fi.post.user.id == req.session.userId
            //sadece knedi gönderilerini silebilecek
            fi.post.hasLiked = fi.hasLiked
            allPosts.push(fi.post)
        }
    })

    if (req.wantsJSON) {
        return res.send(allPosts)
    }

    const string = JSON.stringify(allPosts)
    const objects = JSON.parse(string)

    res.view('pages/post/home', {
        allPosts: objects,
        layout: 'layouts/nav-layout'
    })
}