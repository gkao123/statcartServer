// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });


    // process the signup form
    //https://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling
    //for more complex error handling
     app.post('/signup', passport.authenticate('local-signup', {
       successRedirect: '/profile',
       failureRedirect: '/signup',
       failureFlash : true//allow flash messages
     }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });


   // =====================================
 // FACEBOOK ROUTES =====================
 // =====================================
 // route for facebook authentication and login
 app.get('/auth/facebook', passport.authenticate('facebook', {
   scope : ['public_profile', 'email']
 }));

 // handle the callback after facebook has authenticated the user
 app.get('/auth/facebook/callback',
     passport.authenticate('facebook', {
         successRedirect : '/profile',
         failureRedirect : '/'
     }));
//===========================================
//google login for Brandeis
//===========================================
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
app.get('/auth/google/callback',
        passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
        }));
 //===========================================
 //SAML login for Brandeis
 //==========================================
 app.get('/auth/saml',
   passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function (req, res) {
    res.redirect('/');
  }
);
 app.post('/auth/saml/postResponse',
    passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
    function(req, res) {
      res.redirect('/');
    }
  );
 // route for logging out
 app.get('/logout', function(req, res) {
     req.logout();
     res.redirect('/');
 });
 //api calls
 var beverages = require('./api/beverages')
 app.use('/beverages', beverages)
};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
