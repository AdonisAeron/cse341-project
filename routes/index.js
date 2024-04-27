const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Hello World')
});

routes.use('/contacts', require('./users'));

module.exports = routes;