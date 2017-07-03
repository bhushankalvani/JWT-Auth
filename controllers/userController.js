const User = require('../models/userModel');

module.exports = {
  signup(req, res) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    user.save((saveErr, savedUsr) => {
      if (saveErr) {
        res.status(500).json({ message: 'something went wrong' });
        return;
      }
      res.status(201).json({ user: savedUsr, message: 'success' });
    });
  },
  login(req, res) {
    if (req.body.email && req.body.password) {
      User.findOne({ email: req.body.email }, (findErr, userDoc) => {
        if (findErr) {
          return res.status(500).json({ message: 'something went wrong' });
        }
        if (!userDoc) {
          return res.status(404).json({ message: 'user not found' });
        }
        userDoc.validatePassword(req.body.password, (validatePassErr, isMatch) => {
          if (validatePassErr) {
            console.log(validatePassErr);
            return res.status(401).json(validatePassErr);
          }
          if (isMatch) {
            return res.redirect(`/api/v1/token/${userDoc._id}/${userDoc.email}`); // eslint-disable-line
          }
          return res.status(401).json({ message: 'invalid password' });
        });
      });
    }
  },
};
