module.exports = async function(req, res) {
    const currentUserId = req.session.userId

    const userIdToUnfollow = req.param('id') 
    // hangi kullanıcıyı takipten çıkıcaz, takipten çıkılan kullanıcının id sini alır 

    await User.removeFromCollection(currentUserId, 'following',
     userIdToUnfollow)
     // currentUserId : o an hangi kullanıcının giriş yaptığını söyler ,
     // userIdToUnf : anlık giriş yapan kullanıcının takipten çıktığı hesabın id sidir.

    await FeedItem.destroy({postOwner: userIdToUnfollow})

    await User.removeFromCollection(userIdToUnfollow, 'followers',
    currentUserId)
    // Yukarıdaki işlemim tam tersi olur, followers yani takip edilen kullanıcıyı takipçilerden çıkarmak için
    // takip ettiği kişininin id sini aldı ve takipçilerinden sildi 
    
    res.end()
}