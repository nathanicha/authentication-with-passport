const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");

router.post('/login', function (req, res, next){
    
    passport.authenticate('local', {session:false}, (err, user, info) => {
        
        if(err || !user){
            return res.status(400).json({
                message: 'Failure',
                user: user
            });
        }

        req.login(user, {session:false}, (err) => {
            if(err){
                res.send(err);
            }

            const payload = {
                sub: email,
                iat: new Date().getTime()
            };

            const token = jwt.sign(payload, 
                require('crypto').randomBytes(48, function(err, buffer) {
                    var token = buffer.toString('hex');
                }),
               {expiresIn:'1d'});
            return res.json({user, token});
        });
    })(req, res);
});

module.exports = router;