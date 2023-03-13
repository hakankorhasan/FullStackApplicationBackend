// api/services/UserService.js

module.exports = {
    async findOrCreate(profile) {
        try {
          const user = await User.findOne({ googleId: profile.id });
          if (user) {
            return user;
          }
          const newUser = await User.create({
            googleId: profile.id,
            emailAddress: profile.emails[0].value,
            fullName: profile.displayName,
          }).fetch();
          return newUser;
        } catch (err) {
          throw new Error(err);
        }
      },
  };
  