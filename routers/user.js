const express = require("express")
const router = express.Router()
const mysql = require("mysql")
const bcrypt = require("bcryptjs")
const passport = require("passport");
require("../middleware/passportConfig")(passport);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

router.get("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        console.log("authenticating")
        if (err) throw err;
        if (!user) console.log("No user exists")
        else {
            require.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully authenticated")
            })
        }
    })
})


router.get("/logout", (req, res, next) => {
    console.log("logging out " + req.user.username)
    req.logout()
    req.session.destroy((err) => {
        if (err) return (next(err))
        return res.send({ authenticated: req.isAuthenticated() })
    })
})

router.post("/register", (req, res) => {
    connection.query(`SELECT * FROM users WHERE username = '${req.body.username}' LIMIT 1`, 
    async (err, rows, fields) => {
        if(err) throw err;
        if (rows[0]) { console.log("User Exists") }
        if (!rows[0]) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            connection.query(`INSERT INTO users (username, password, created_at, updated_at) VALUES ('${req.body.username}', '${hashedPassword}', '${req.body.createdAt}', '${req.body.updatedAt}')`)
            console.log("User added")
        }
    })
})

module.exports = router