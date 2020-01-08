const express = require("express");
const Database = require("./Models/Database");
const controllers = require("./Controllers");

const config = require("./config.json");


const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/static"));

app.engine("ejs", require("ejs").__express);
app.set("view engine", "ejs");

app.listen(port, () => {
    console.log("Server listen on", port);
});

app.get("/", (req, res) => {
    return res.render("index");
});


const router = express.Router();
const db = new Database(config);
app.use("/api", router);
controllers(router, db);



