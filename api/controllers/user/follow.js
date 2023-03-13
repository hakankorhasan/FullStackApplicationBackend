module.exports = async function(req, res) {

    //assocation
    const currentUserId = req.session.userId
    const userIdToFollow = req.param('id')

    await User.addToCollection(currentUserId, 'following',
    userIdToFollow)


    const postsForUserImFollowing = await Post.find({user: userIdToFollow})
    postsForUserImFollowing.forEach(async p => {
        console.log(p.text)
        await FeedItem.create({
            post: p.id,
            postOwner: userIdToFollow,
            user: currentUserId,
            postCreatedAt: p.createdAt
        })
        console.log("finished")
    });

    await User.addToCollection(userIdToFollow, 'followers',
    currentUserId)
    
    res.end()
}