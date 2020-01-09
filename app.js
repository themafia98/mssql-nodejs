const express = require("express");
const Database = require("./Models/Database");
const controllers = require("./Controllers");
const config = require("./config.json");
const moment = require("moment");


const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/static"));

app.engine("ejs", require("ejs").__express);
app.set("view engine", "ejs");

app.listen(port, () => {
    console.log("Server listen on", port);
});

const router = express.Router();
const db = new Database(config);
app.use("/api", router);
controllers(router, db);

app.get("/", async (req, res) => {
    try {
        const connect = await db.connect();
        if (!connect) return res.render("index", {error: "Invalid connect to mssql"});

        const indications = await connect.query`SELECT * FROM dbo.Indications`;
        const regions = await connect.query`SELECT * FROM dbo.Regions`;
        const sensors = await connect.query`SELECT * FROM dbo.Sensors`;

        db.close();
        if (!indications || !regions) return res.render("index", { error: "Invalid query" });
        
        parseIndications = Array.isArray(indications.recordsets[0]) ? indications.recordsets[0].map(it => {
            
            const dateInd = it.dateInd ? moment(it.dateInd.toString()).format("DD-MM-YYYY") : null;
            const timeInd = it.timeInd ? moment(it.timeInd.toString()).hours() : null;
            return {
                ...it,
                dateInd,
                timeInd,
            } 
        }) : [];

        return res.render("index", {
                error: null, 
                indications: parseIndications,
                regions: Array.isArray(regions.recordsets[0]) ? regions.recordsets[0] : [],
                sensors: Array.isArray(sensors.recordsets[0]) ? sensors.recordsets[0] : [],
                procedureResult: null,
        });
    } catch(err){
        if (res.headersSent) res.render("index", { error: "Server error" });
    }
});




