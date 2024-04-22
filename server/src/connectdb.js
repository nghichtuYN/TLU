const sql = require("mssql/msnodesqlv8");
const config = {
  server: "localhost\\SQLEXPRESS",
  user: "sa",
  password: "260503",
  database: "LibraryManagement",
  driver: "msnodesqlv8",
};

const connect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const connect= new sql.ConnectionPool(config)
      connect.on('connect ',(err)=>{
        console.log("Connected");
        executeStatement1();  
      })
      const pool = await connect.connect();
      resolve(pool);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  connect,
  sql,
};
