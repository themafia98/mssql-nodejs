const express = require("express");
const bodyParser = require("body-parser");
const Database = require("./Models/Database");
const root = require("./Controllers/Root");
const api = require("./Controllers/Api");
const config = require("./config.json");

/** App */
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/static"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.engine("ejs", require("ejs").__express);
app.set("view engine", "ejs");

app.listen(port, () => {
    console.log("Server listen on", port);
});

const router = express.Router();
const db = new Database(config);

app.use("/api", router);

/** init controllers */
root(app, db);
api(router, db);




