const express = require("express");
const app = express();
const path = require("path");
const pathToDist = path.join(__dirname, "../AniList/dist");
const serveStatic = express.static(pathToDist);

app.use(serveStatic);
app.get("/", () => console.log("i work"));
const port = 1234;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
