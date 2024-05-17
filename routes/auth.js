const routes = require('express').Router();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

routes.get('/callback', passport.authenticate('github', { failureRedirect: '/api-docs' }), (req, res) => {
    try {
        if (!req.user) {
            throw new Error('No user returned from GitHub');
        }
        req.session.user = req.user;
        res.redirect('/');
    } catch (error) {
        console.error('Callback Error:', error);
        res.redirect('/api-docs');
    }
});

module.exports = routes;
