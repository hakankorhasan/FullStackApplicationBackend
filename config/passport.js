/*module.exports.passport = {
    local: {
      strategy: require('passport-local').Strategy
    },
    google: {
      name: 'Google',
      protocol: 'oauth2',
      strategy: require('passport-google-oauth').OAuth2Strategy,
      options: {
        clientID: '26395972057-rt4c3lh554sje2ifpnurutfs2lcql79d.apps.googleusercontent.com',
        clientSecret: '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',
        scope: ['profile', 'email'],
        callbackURL: 'http://localhost:1337/auth/google/callback'
      }
    }
  };*/
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const GOOGLE_CLIENT_ID = '26395972057-rt4c3lh554sje2ifpnurutfs2lcql79d.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:1337/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
