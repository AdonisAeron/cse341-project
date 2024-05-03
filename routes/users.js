const routes = require('express').Router();
const uController = require('../controllers/users');

routes.get('/', uController.getAll);
routes.get('/:id', uController.getSingle);

routes.post('/', uController.createContact);

routes.put('/:id', uController.updateContact);

routes.delete('/:id', uController.deleteContact);

module.exports = routes;