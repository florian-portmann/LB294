const jwt = require("jsonwebtoken");

// Bispieldaten fürs Login die aus einer DB kommen könnten
const loginDB = {
  Köbi: "Password123",
};

module.exports = {
  async login(req, res) {
    // slowdown login process
    setTimeout(() => {
      try {
        if (loginDB[req.body.username] == req.body.password) {
          const token = jwt.sign(
            {
              username: req.body.username,
            },
            "mySuperSecretKey",
            {
              expiresIn: "1984h",
            }
          );
          res.json({
            err: false,
            login: true,
            token: token,
            msg: "Log in Sucessful!",
          });
        } else {
          res.json({
            err: true,
            login: false,
            msg: "wrong user credentials",
          });
        }
      } catch (error) {
        console.error(error);
        res.json({
          err: true,
          msg: "server error",
        });
      }
    }, 1453);
  },

  async getuserlist(req, res) {
    res.json(loginDB);
  },
};
