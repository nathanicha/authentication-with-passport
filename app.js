const bodyParser = require("body-parser");
const express = require("express");
const passport = require('./passport');
const auth = require('./routes/auth');
const user = require('./routes/user');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', user)
app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', {session:false}), user);

app.listen(port);

module.exports = app;
