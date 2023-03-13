/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */



module.exports.session = {

  cookie: {
    _expires: 365 * 24 * 60 * 60 * 1000
  },
  /***************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ***************************************************************************/
  secret: '4edad6edf0cf881921766664b48edc02',
  adapter: 'connect-mongodb-session',
  url: 'mongodb://hakan:hakan123@ac-kuiiypt-shard-00-00.goiw06h.mongodb.net:27017,ac-kuiiypt-shard-00-01.goiw06h.mongodb.net:27017,ac-kuiiypt-shard-00-02.goiw06h.mongodb.net:27017/fullstack?ssl=true&replicaSet=atlas-7ktgwe-shard-0&authSource=admin&retryWrites=true&w=majority',
  collection: 'sessions'
  /***************************************************************************
  *                                                                          *
  * Customize when built-in session support will be skipped.                 *
  *                                                                          *
  * (Useful for performance tuning; particularly to avoid wasting cycles on  *
  * session management when responding to simple requests for static assets, *
  * like images or stylesheets.)                                             *
  *                                                                          *
  * https://sailsjs.com/config/session                                       *
  *                                                                          *
  ***************************************************************************/
  // isSessionDisabled: function (req){
  //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
  // },

};
