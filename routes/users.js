const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users')

//route for get all contacts
router.get('/', usersController.getAll);

//route for get single contact
router.get('/:id', usersController.getSingle);

//route to Create a contact
router.post('/', usersController.createContact);

//route for update a contact
router.put('/:id', usersController.updateSingleContact);

//route for delete a contact
router.delete('/:id', usersController.deleteContact);

module.exports = router;