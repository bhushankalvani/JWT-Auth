const express = require('express');
const tokenController = require('../controllers/tokenController');

const router = express.Router();

// NOTE: Route to generate a new Token.
router.get('/:id/:email', tokenController.genToken);

module.exports = router;
