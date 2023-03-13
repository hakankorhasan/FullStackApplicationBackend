module.exports = async function (req, res) {
    console.log("show public")

    const id = req.param('id')
    const user = await User.findOne({ id: id })
        .populate('following')
        .populate('followers')

    const posts = await Post.find({user: id})
    .sort('createdAt DESC')
    .populate('user')

    user.posts = posts

    user.followers.forEach(f => {
        if (f.id == req.session.userId) {
            user.isFollowing = true
        }
    });

    const sanitizedUsers = JSON.parse(JSON.stringify(user))

    sanitizedUsers.isFollowing = user.isFollowing

    //if(req.wantsJSON) {
        return res.send(sanitizedUsers)
    //}

    res.view('pages/user/publicprofile', {
        layout: 'layouts/nav-layout',
        user: sanitizedUsers
    })
}