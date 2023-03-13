module.exports = {
  google: function(req, res) {
    sails.services.passport.callback(req, res, function(err, user) {
      if (err || !user) {
        return res.redirect('/login');
      }
      req.login(user, function(err) {
        if (err) {
          return res.redirect('/login');
        }
        return res.redirect('/');
      });
    });
  },

  googleCallback: async function(req, res) {
    sails.services.passport.callback(req, res, async function(err, user) {
      if (err || !user) {
        return res.redirect('/login');
      }
      try {
        const profile = await sails.helpers.googleProfile(user);
        const newUser = await UserService.findOrCreate(profile);
        req.login(newUser, function(err) {
          if (err) {
            return res.redirect('/login');
          }
          return res.redirect('/');
        });
      } catch (err) {
        console.error(err);
        return res.redirect('/login');
      }
    });
  }
};
