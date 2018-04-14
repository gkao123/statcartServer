//config/auth.js

module.exports = {
  'facebookAuth' : {
    'clientID' : '160951541393267',
    'clientSecret' : 'e67c7daa23c35926081375165522d0fc',
    'callbackURL' : 'http://localhoust:3000/auth/facebook/callback',
    'profileURL' : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    'profileFields': ['id', 'email', 'name']//for requesting permission from facebok API
  }
};
