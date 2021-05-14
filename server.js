const express = require("express");
const cors = require("cors")
const app = express();

app.get("/", (req, res) => res.send("Hello world"))

app.get("/data", (req, res) => res.json({ data: "Jacob" }))


if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening at port ${port}`));
