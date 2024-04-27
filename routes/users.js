const routes = require('express').Router();
const uController = require('../controllers/users');

routes.get('/', uController.getAll);
routes.get('/:id', uController.getSingle);

module.exports = routes;