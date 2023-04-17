const bcrypt = require("bcryptjs")
const localStrategy = require("passport-local").Strategy
require("dotenv").config()
const db = require("../db")

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      db.query(
        `SELECT * FROM users WHERE username = '${username}'`,
        (err, rows) => {
          if (err) throw err
          if (!rows[0]) return done(null, false)

          bcrypt.compare(password, rows[0].password, (err, result) => {
            if (err) throw err
            let user = rows[0]
            if (result === true) {
              return done(null, user)
            } else {
              return done(null, false, {
                message: "Username or password is incorrect",
              })
            }
          })
        }
      )
    })
  )

  passport.serializeUser((user, callback) => {
    console.log("Serializing user")
    callback(null, user.id)
  })

  passport.deserializeUser((id, callback) => {
    console.log("Deserializing user")
    db.query(`SELECT * FROM users WHERE id = '${id}'`, (err, rows) => {
      callback(err, rows[0])
    })
  })
}
