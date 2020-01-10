
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
        if (this.connection){
            this.connection.close();
        }
    }
};