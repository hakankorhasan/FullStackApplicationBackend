module.exports = async function(req, res) {

    const currentUser = await User.findOne({id: req.session.userId})
        .populate('following').populate('followers')

    const posts = await Post.find({user: req.session.userId})
        .sort('createdAt DESC')
        .populate('user')      

    currentUser.posts = posts

    if (req.wantsJSON) {
        return res.send(currentUser)
    }

    // customToJSON
    const sanitizedUser = JSON.parse(JSON.stringify(currentUser))

    res.view('pages/user/profile', {
        layout: 'layouts/nav-layout',
        user: sanitizedUser
    })
}