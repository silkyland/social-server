import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import LocalStrategy from "passport-local";
import User from "./schema/User";

import config from "./config";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (username, password, callback) => {
      User.findOne({
        username: username,
        password: password
      })
        .then(user => {
          if (!user)
            return callback(null, false, {
              message: "Incorrect username or password"
            });
          return callback(null, user, { message: "Logged in successfully" });
        })
        .catch(error => {
          return callback(error);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.APP_SECRET
    },
    (payload, callback) => {
      return User.findOneById(payload._id)
        .then(user => {
          return callback(null, user);
        })
        .catch(error => {
          return callback(error);
        });
    }
  )
);

export default passport;
