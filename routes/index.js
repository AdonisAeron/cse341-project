const routes = require('express').Router();
const passport = require('passport');

routes.use('/', require('./swagger'));

routes.use('/contacts', require('./users'));

routes.use('/github', require('./auth'))

routes.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    const message = req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out"
    res.send(`Hello World, ${message}`);
});

routes.get('/login', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/'); 
    });
});

module.exports = routes;