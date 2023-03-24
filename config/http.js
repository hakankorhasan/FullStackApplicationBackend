/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {

  middleware: {

    passportInit: require('passport').initialize(),
    passportSession: require('passport').session(),
    session: (function () {

      const MongoStore = require('connect-mongodb-session')(require('express-session'));

      return require('express-session')({
        secret: 's3cret',
        saveUninitialized: true,
        resave: false,
        store: new MongoStore({
          url: 'mongodb://hakan:hakan123@ac-kuiiypt-shard-00-00.goiw06h.mongodb.net:27017,ac-kuiiypt-shard-00-01.goiw06h.mongodb.net:27017,ac-kuiiypt-shard-00-02.goiw06h.mongodb.net:27017/fullstack?ssl=true&replicaSet=atlas-7ktgwe-shard-0&authSource=admin&retryWrites=true&w=majority'
        }),
        cookie: {
          maxAge: 24 * 60 * 60 * 1000
        }
      });
    })(),

    order: [
      'cookieParser',
      'session',
      'passportInit',
      'passportSession',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],
  },

};
