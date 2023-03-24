module.exports = async function(req, res) {

    const userId = req.session.userId

    User.destroy({ id: userId }).exec((err) => {
        if (err) {
          return res.serverError(err);
        }
        return res.ok('Kullanıcı silindi.');
      });
}