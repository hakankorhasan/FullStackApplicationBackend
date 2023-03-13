module.exports = async function (req, res) {
    const users = await User.find({})
    
    res.send(users)
}