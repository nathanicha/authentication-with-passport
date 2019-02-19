const mongoose = require('mongoose');
const config = require('config.json');
var url = "mongodb://localhost:27017/";

mongoose.connect(process.env.MONGODB_URL || config.connectionString);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../model/usermodel')
}