const express = require("express")
const cors = require("cors")
const app = express()
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
  port: process.env.DB_PORT,
}

let MySQLStore = require("express-mysql-session")(session)

let origin
if (process.env.NODE_ENV === "production") {
  origin = "https://zeddit.netlify.app"
} else {
  origin = "http://localhost:3000"
}

app.use(
  cors({
    origin,
    credentials: true,
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const fs = require("fs")

// Configuring Passport
const passport = require("passport")
let sessionStore = new MySQLStore(options)
app.use(cookieParser(process.env.cookieSecret))
app.use(
  session({
    // ! Below is backup that works on every browser
    // secret: `${process.env.cookieSecret}`,
    // resave: false,
    // saveUninitialized: true,
    // store: sessionStore,
    // cookie: {
    //   secure: false,
    //   maxAge: 1000 * 60 * 60 * 24,
    // },

    store: sessionStore,
    secret: process.env.cookieSecret,
    proxy: true,
    saveUninitialized: true, // allows any uninitialized session to be sent to the store. When a session is created but not modified, it is referred to as uninitialized.
    resave: false, // enables the session to be stored back to the session store, even if the session was never modified during the request.
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // one day
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : false
    },
  })
)

require("./middleware/passportConfig")(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use("/users", userRouter)
app.use("/posts", postsRouter)
app.use("/subreddits", subredditsRouter)
app.use("/comments", commentsRouter)
app.use("/votes", votesRouter)
app.use("/search", searchRouter)

// const pathToIndex = path.join(__dirname, "client/build", "index.html")
// console.log(pathToIndex)
// app.get("/", (req, res) => {
//   const raw = fs.readFileSync(pathToIndex).toString()
//   const pageTitle = "Home - Zeddit"
//   const updated = raw.replace('__PAGE_META__', `<title>${pageTitle}</title>`)
//   console.log(updated)
//   res.send(updated)
// })

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, "client/build")))
//   app.get("*", (req, res) =>
//     res.sendFile(path.join(__dirname, "client/build/index.html"))
//   )
// }

const port = process.env.PORT || 6000

app.listen(port, () =>
  console.log(
    `Server is listening at port ${port} \n--------------------------------`
  )
)
