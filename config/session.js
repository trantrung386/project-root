const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = (mongoUri, secret) => {
  return session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoUri }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  });
};
