const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users')

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

router.post('/', usersController.createContact);

router.put('/:id', usersController.updateSingleContact);

router.delete('/:id', usersController.deleteContact);

module.exports = router;