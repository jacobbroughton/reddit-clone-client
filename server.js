const express = require("express");
const cors = require("cors")
const app = express();
const passport = require("passport")
const cookieParser = require("cookie-parser")
const session = require("express-session")
require("./middleware/passportConfig")(passport)

const userRouter = require("./routers/user")


app.use(cors());
app.use(express.json())

let MySQLStore = require("express-mysql-session")(session)

let options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
}

let sessionStore = new MySQLStore(options)

app.use(session({
  secret: `${process.env.cookieSecret}`,
  resave: true,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

app.use(cookieParser(process.env.cookieSecret))
app.use(passport.initialize())
app.use(passport.session())


// if (process.env.NODE_ENV === "production") {
//   // Exprees will serve up production assets
//   app.use(express.static("client/build"));

//   // Express serve up index.html file if it doesn't recognize route
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.get("/", (req, res) => {
  res.send("Hello from the server")
})

app.use('/users', userRouter)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening at port ${port}`));
