const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const jwtKey = '4u7x!A%D*G-KaPdSgVkYp3s6v8y/B?E(';

module.exports = {
  genToken(req, res) {
    User.findOne({ email: req.params.email }, (findErr, userDoc) => {
      if (findErr) {
        res.status(500).json({ error: 500, message: 'something went wrong' });
        return;
      }
      if (!userDoc) {
        res.status(404).json({ error: 404, message: 'user not found' });
        return;
      }
      if (userDoc._id.toString() === req.params.id) { // eslint-disable-line
        const payload = { id: userDoc._id }; // eslint-disable-line
        const token = jwt.sign(payload, jwtKey);
        res.status(201).json({ token });
      } else {
        res.status(401).json({ message: 'id and info request id do not match' });
      }
    });
  },
};
