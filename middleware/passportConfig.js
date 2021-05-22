const bcrypt = require("bcryptjs")
const localStrategy = require("passport-local").Strategy
const mysql = require("mysql")
require("dotenv").config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

connection.connect()

module.exports = function(passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            connection.query(`SELECT * FROM users WHERE username = '${username}`, (err, rows, fields) => {
                if(err) throw err;
                if(!rows[0]) return done(null, false)

                bcrypt.compare(password, rows[0].password, (err, result) => {
                    if(err) throw err;
                    let user = rows[0]
                    if(result === true) {
                        return done(null, false, { message: 'Invalid password' })
                    }
                })
            })
        })
    )

    passport.serializeUser((user, callback) => {
        console.log("Serializing user")
        console.log(user)
        callback(null, user.id)
    })

    passport.deserializeUser((id, callback) => {
        console.log("Deserializing user")
        connection.query(`SELECT * FROM users WHERE id = '${id}'`, (err, rows, columns) => {
            callback(err, rows[0])
        })
    })
}