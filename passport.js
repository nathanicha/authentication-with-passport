const passport = require('passport');
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require('passport-local').Strategy;

//local
passport.use(new LocalStrategy({
        email: 'mak'
    },
    function (userId, cb){
        return UserModel.findOneById({userId})
            .then(user =>{
                if(!user){
                    return cb(null, false, {
                        message: 'Incorrect email or password'
                    });
                }
                
                return cb(null, false, {
                    message: 'Logged in Successfully'
                });
            })
            .catch(err =>{
                return cb(err);
            });
    }
));


//jwt
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'AUTHENTICATION'
    },
    function (jwtPayload, cd){
        //find user in db if needed. 
        //But if you store everything in JWT payload. 
        //This functionality may be omttied
        return UserModel.findOneById(jwtPayload.id)
            .then(user =>{
                return cd(null,user);
            })
            .catch(err => {
                return cd(err);
            });
    }
));

module.exports = passport;