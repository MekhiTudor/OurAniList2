const express = require("express");
const app = express();
const path = require("path");
const pathToDist = path.join(__dirname, "../AniList/dist");
const serveStatic = express.static(pathToDist);

const sayHello = (req, res, nxt) => {
  console.log(req);
  res.send("hello");
};

app.use(serveStatic);

app.get("/", sayHello);
const port = 9999;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
