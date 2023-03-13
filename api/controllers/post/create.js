module.exports = async function (req, res) {
  const postBody = req.body.postBody
  const file = req.file('imagefile') // frontend de bu dosyaya eklenecek imagelar


  try {

    const fileUrl = await sails.helpers.uploadfile(file)
    const userId = req.session.userId

    const postRecord = await Post.create({ //post yapısını oluşturduh
      text: postBody,
      user: userId,
      imageUrl: fileUrl
    }).fetch()

    await FeedItem.create({
      post: postRecord.id,
      postOwner: userId,
      user: userId,
      postCreatedAt: postRecord.createdAt
    })

    const user = await User.findOne({id: userId}).populate('followers')
    user.followers.forEach(async f => {
      console.log(f.fullName)
      await FeedItem.create({
        post: postRecord.id,
        postOwner: userId,
        user: f.id,
        postCreatedAt: postRecord.createdAt
      })
    })

    res.end()
  } catch (err) {
    res.serverError(err.toString())
  }

}