const routes = require('express').Router();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

routes.get('/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false
}), (req, res) => {
    if (req.error) {
        console.error("Authentication error: ", req.error);
        res.status(500).send("Authentication error");
    } else {
        req.session.user = req.user;
        res.redirect('/');
    }
});


module.exports = routes;
