const express = require('express');
var cors = require('cors')

const connectToMongo = require('./db')

connectToMongo();
const app = express();
const port = 5000;

app.use(cors())


/////////// AVAILABLE ROUTES //////////
app.use(express.json()); /////// middlevare
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

// server ->  http://localhost:3000 