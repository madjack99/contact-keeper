const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'not a valid email').isEmail(),
    check('password', 'min 3 chars').isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).send({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send('user saved');
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
