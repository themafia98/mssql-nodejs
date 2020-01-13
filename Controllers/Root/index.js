
const moment = require("moment");

module.exports = (app, db) => {
    app.get("/", async (req, res) => {
        try {
            const connect = await db.connect();
            if (!connect){ 
                return res.render("index", {error: "Invalid connect to mssql"});
            }
    
            /** Data tables */
            const indications = await connect.query`SELECT * FROM dbo.Indications`;
            const regions = await connect.query`SELECT * FROM dbo.Regions`;
            const sensors = await connect.query`SELECT * FROM dbo.Sensors`;
    
            db.close();

            if (!indications || !regions){
                return res.render("index", { error: "Invalid query" });
            }
            
            parseIndications = Array.isArray(indications.recordsets[0]) ? indications.recordsets[0].map(it => {
                const dateInd = it.dateInd ? moment(it.dateInd.toString()).format("DD-MM-YYYY") : null;
                
                if (!it.timeInd) return {...it, dateInd, time: null};
               
                    const arrTime = JSON.stringify(it.timeInd).split("");
                    const pivot = arrTime.findIndex(it => it && it === "T");
                    const time = pivot !== -1 ? arrTime.splice(pivot + 1, 5).join("").replace(/\,/gi,"") : null;

                    if (!time) return {...it, dateInd, time: null};

                    const isValidTime = /\d\:\d/.test(time);

                    if (!isValidTime) return {...it, dateInd, time: null};

                return {
                    ...it,
                    dateInd,
                    timeInd: time,
                } 
            }) : [];
    
            return res.render("index", {
                    error: null, 
                    indications: parseIndications,
                    regions: Array.isArray(regions.recordsets[0]) ? regions.recordsets[0] : [],
                    sensors: Array.isArray(sensors.recordsets[0]) ? sensors.recordsets[0] : [],
            });
        } catch(err){
            if (!res.headersSent){ 
               return res.render("index", { error: "Server error" });
            }
        }
    });
};