const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'AdiisaGreatCoder#@s'
///////////ROUTE - 1 - REGISTER   ////////////////////////////////
////// create a user using: POST "/api/auth/" . doesnt require authentication

router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('password', 'Password must be atleast 5 charachters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    ///////// if there are errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, error: errors.array() });
    }
    try {
        ///////// check whether the user with this email exists already?
        let user = await User.findOne({ email: req.body.email }); /////// findOne is a promise so await must be used
        if (user) {
            return res.status(400).json({ success, error: "sorry a user with this email already exists" })
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
        success = true;
        res.json({ success, authToken })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }
})
//////////////////////////// ROUTE-2 LOGIN ///////////////////////////
// application.use('/api/auth', require('./routes/auth')) 

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must not be blank').exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        res.status(500).send("Internal Server Error ");
    }

})
///////// ROUTE-3 GET_USER_INFORMATION  - LOGIN_REQUIRED /////////////////////////
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error ");
    }
})


module.exports = router;