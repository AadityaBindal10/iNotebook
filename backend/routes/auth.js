const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'AdiisaGreatCoder#@s'
////// create a user using: POST "/api/auth/" . doesnt require authentication

router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('password', 'Password must be atleast 5 charachters').isLength({ min: 5 }),
], async (req, res) => {
    ///////// if there are errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        ///////// check whether the user with this email exists already?
        let user = await User.findOne({ email: req.body.email }); /////// findOne is a promise so await must be used
        if (user) {
            return res.status(400).json({ error: "sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        // .then(user => res.json(user));
        // res.json()
        res.json({ authToken })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }
})
// application.use('/api/auth', require('./routes/auth')) 

module.exports = router;