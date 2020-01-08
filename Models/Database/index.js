
const mssql = require("mssql/msnodesqlv8");

module.exports = class Database {
    constructor(config){
        this.config = config;
        this.connection = null;
    }

    async connect(){
        try {
        this.connection = await mssql.connect(this.config);
        console.log("Node.js server connected to mssql server");
        return this.connection;
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    async close(){
        if (this.connection) this.connection.close();
    }

    async query(queryString){
        if (this.connection)
        return await this.connection.query`${queryString}`;
        else return null;
    }
};

       // const connection = await mssql.connect(config);

        // close connect connection.close();

        /** procedure call example
             const result = await pool.request()
            .input('input_parameter', sql.Int, value)
            .output('output_parameter', sql.VarChar(50))
            .execute('procedure_name');
            console.log(result);
         */

         /** simple query example
            const result = await sql.query`SELECT * FROM dbo.Indications`;
        */