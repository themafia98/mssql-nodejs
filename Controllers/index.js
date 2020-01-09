
module.exports = function(route, db){
    route.get("/rangeTemp", async (req, res) => {
        try {
        const connect = await db.connect();
        if (!connect) return res.sendStatus(503);

        
        // connect.input('input_parameter', sql.int, value)
        //     .output('output_parameter', sql.VarChar(50))
        //     .execute('procedure_name');
        db.close();

        } catch(err){
            console.err(err);
            if (res.headersSent) res.sendStatus(500);
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
            if (res.headersSent) res.sendStatus(500);
        }
    });
}