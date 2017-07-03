const express = require('express');
const userController = require('../controllers/userController');
const passport = require('passport');

const router = express.Router();
// NOTE: Add to path which needs to be authenticated before access.
const auth = passport.authenticate('jwt', { session: false });

// NOTE: Keep authenticated and Unauthenticated routes sepearate
// NOTE: Unauthenticated Routes
// SIGNUP
router.post('/signup', userController.signup);
// LOGIN
router.post('/login', userController.login);

// NOTE: Authenticated Routes
router.get('/secret', auth, (req, res) => {
  res.json({ message: 'Success! You can not see this without a token' });
});

module.exports = router;
