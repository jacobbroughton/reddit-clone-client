const express = require("express");
const cors = require("cors")
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const session = require("express-session")
require("dotenv").config()

const userRouter = require("./routers/userRouter")
const postsRouter = require("./routers/postsRouter")
const subredditsRouter = require("./routers/subredditsRouter")
const commentsRouter = require("./routers/commentsRouter")
const votesRouter = require("./routers/votesRouter")
const searchRouter = require("./routers/searchRouter")


let options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
}
let MySQLStore = require("express-mysql-session")(session)

let origin;
if(process.env.NODE_ENV === "production") {
  origin = "https://reddit-clone-jb.herokuapp.com"
  // origin = "https://reddit-clone-jb.netlify.app"
} else {
  origin = "http://localhost:3000"
}

app.use(
  cors({
  origin,
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Configuring Passport
const passport = require("passport")
let sessionStore = new MySQLStore(options)
app.use(session({
  secret: `${process.env.cookieSecret}`,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

require("./middleware/passportConfig")(passport)
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
app.use('/posts', postsRouter)
app.use('/subreddits', subredditsRouter)
app.use('/comments', commentsRouter)
app.use('/votes', votesRouter)
app.use('/search', searchRouter)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening at port ${port} \n--------------------------------`));
