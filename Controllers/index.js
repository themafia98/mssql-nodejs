const moment = require("moment");

module.exports = function(route, db){
    route.post("/rangeTemp", async (req, res) => {
        try {
            const { startDate = null, endDate = null, startTime = null, endTime = null  } = req.body;
    
            if (!startDate || !endDate || !startTime || !endTime){
                return res.sendStatus(403);
           }

            const connect = await db.connect();
            if (!connect) return res.sendStatus(503);
  
            const result = await connect.request()
                .input('startDate', moment(startDate.toString()).format("YYYY-MM-DD"))
                .input('endDate',  moment(endDate.toString()).format("YYYY-MM-DD"))
                .input('startTime', moment(startTime.toString()).format("hh:mm:ss"))
                .input('endTime', moment(endTime.toString()).format("hh:mm:ss"))
                .execute('GET_TEMP');

            const isValid = result && Array.isArray(result.recordset)
            db.close();

            
            if (isValid) {
                const parseData = result.recordset.map(it => {
            
                    const date = it.date ? moment(it.date.toString()).format("DD-MM-YYYY") : null;
                    const time = it.time ? moment(it.time.toString()).format("hh:mm") : null;
                    return { ...it, date, time };
                });
                return res.status(200).json(JSON.stringify(parseData));
            }
            else return res.sendStatus(404);


        } catch(err){
            console.error(err);
            if (!res.headersSent) res.sendStatus(500);
        }
    });

    route.post("/minMaxTemp", async (req, res) => {
        try {
            const {  startTime = null, endTime = null  } = req.body;
    
            if (!startTime || !endTime){
                return res.sendStatus(403);
           }

            const connect = await db.connect();
            if (!connect) return res.sendStatus(503);
  
            const result = await connect.request()
                .input('startTime', startTime)
                .input('endTime', endTime)
                .execute('GET_MIN_MAX_TEMP');

            const isValid = result && Array.isArray(result.recordset)
            db.close();
            
            if (isValid) {
                return res.status(200).json(JSON.stringify(result.recordset));
            }
            else return res.sendStatus(404);


        } catch(err){
            console.error(err);
            if (!res.headersSent) res.sendStatus(500);
        }
    });

    
    route.post("/sensorLocation", async (req, res) => {
        try {
            const { regionNumber = null  } = req.body;
    
            if (!regionNumber && regionNumber !== 0){
                return res.sendStatus(403);
           }

            const connect = await db.connect();
            if (!connect) return res.sendStatus(503);
  
            const result = await connect.request()
                .input('regionNumber', regionNumber)
                .execute('GET_LOCATION');

            const isValid = result && Array.isArray(result.recordset)
            db.close();
            
            if (isValid) {
                return res.status(200).json(JSON.stringify(result.recordset));
            }
            else return res.sendStatus(404);


        } catch(err){
            console.error(err);
            if (!res.headersSent) res.sendStatus(500);
        }
    });

    route.get("/calcTemp", async (req, res) => {
        try {
        const connect = await db.connect();
        if (!connect) return res.sendStatus(503);

        const calcResult = await connect.request().execute("GET_CALC");
        const isValid = calcResult && Array.isArray(calcResult.recordset) && calcResult.recordset.length;
        db.close();
        
        
        if (isValid) return res.status(200).json(JSON.stringify(calcResult.recordset[0]));
        else return res.sendStatus(404);

        } catch(err){
            console.error(err);
            if (!res.headersSent) res.sendStatus(500);
        }
    });
}