const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { json } = require('express');
const User = require('../../models/user');
//@route   post api/users
//@desc    register user
//@access  public


router.post('/',
    [check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter the valid email').isEmail(),
    check('password', 'please enter a password with 6 or more charecter').isLength(
        { min: 6 }
    )
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
            }

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            const salt = await bcrypt.genSalt(10);
            userpassword = await bcrypt.hash(password, salt);

            user = new User({
                name,
                email,
                avatar,
                password: userpassword
            });

            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 36000000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            )


        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }

    })

module.exports = router;