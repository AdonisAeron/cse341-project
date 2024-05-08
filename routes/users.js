const routes = require('express').Router();
const uController = require('../controllers/users');
const validator = require('../validators/contacts').contactValidator;
const validationHandler = require('../validators/contacts').validationHandler

routes.get('/', uController.getAll);
routes.get('/:id', uController.getSingle);
routes.post('/', validator, validationHandler, uController.createContact);
routes.put('/:id', validator, validationHandler, uController.updateContact);
routes.delete('/:id', uController.deleteContact);

module.exports = routes;