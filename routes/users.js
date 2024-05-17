const routes = require('express').Router();
const uController = require('../controllers/users');
const isAuthenticated = require('../validators/authenticate').isAuthenticated;
const validator = require('../validators/contacts').contactValidator;
const validationHandler = require('../validators/contacts').validationHandler

routes.get('/', uController.getAll);
routes.get('/:id', uController.getSingle);
routes.post('/', isAuthenticated, validator, validationHandler, uController.createContact);
routes.put('/:id', isAuthenticated, validator, validationHandler, uController.updateContact);
routes.delete('/:id',isAuthenticated, uController.deleteContact);

module.exports = routes;