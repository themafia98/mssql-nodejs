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
                .input('startDate', moment(startDate).format("YYYY-MM-DD"))
                .input('endDate',  moment(endDate).format("YYYY-MM-DD"))
                .input('startTime', startTime)
                .input('endTime', endTime)
                .execute('GET_TEMP');

            const isValid = result && Array.isArray(result.recordset)
            db.close();

            if (isValid) {
                const parseData = result.recordset.map(it => {
                    const date = it.date ? moment(it.date).format("DD-MM-YYYY") : null;

                    if (!it.time) return {...it, date, time: null};

                    const arrTime = JSON.stringify(it.time).split("");
                    const pivot = arrTime.findIndex(it => it && it === "T");
                    const time = pivot !== -1 ? arrTime.splice(pivot + 1, 5).join("").replace(/\,/gi,"") : null;

                    if (!time) return null;

                    const timeNumber = Number(time.replace(/\D+/gi, ""));
                    const startTimeNumber = Number(startTime.replace(/\D+/gi, ""));
                    const endTimeNumber = Number(endTime.replace(/\D+/gi, ""));

                    const isValidInterspace = startTimeNumber < timeNumber && endTimeNumber > timeNumber;
                    const isValidTime = /\d\:\d/.test(time) && isValidInterspace;

                    if (!isValidTime) return null;
                    return { ...it, date, time: time };
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

            const isValid = result && Array.isArray(result.recordset);
            db.close();
            
            if (isValid){
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