module.exports = async function(req, res) {

    const currentUser = await User.findOne({id: req.session.userId}).populate('following')

    const followingUsers = currentUser.following.map(f => f.id)
    
    const followedUsers = await User.find({
        id: { 
            '!=': req.session.userId, 
            in: followingUsers
        }
    })
    
    const sanitizedUsers = followedUsers.map(u => {
        return {
            id: u.id,
            fullName: u.fullName,
            profileImageUrl: u.profileImageUrl,
            emailAddress: u.emailAddress,
            isFollowing: true
        }
    })
    
     
        if(req.wantsJSON){
            return res.send(sanitizedUsers)
        }
    
        res.view('pages/user/search', {
            layout: 'layouts/nav-layout',
            users: sanitizedUsers
        })
}
