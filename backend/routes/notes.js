const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        a: 'adis'
    }
    res.json(obj);
})
// application.use('/api/auth', require('./routes/auth')) 

module.exports = router