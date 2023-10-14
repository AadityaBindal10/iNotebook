const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017"

const connectToMongo = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/test');
}


module.exports = connectToMongo;
