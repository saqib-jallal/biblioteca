const mySql = require("mysql2");
const config = require("./default.json");

const database = mySql.createConnection({
  host: config.host,
  user: config.user,
  password: config.dbPassword,
  database: config.dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
  // debug: true,
});

database.connect((error) => {
  if (!error) console.log("DATABASE CONNECTED!");
  else console.log(`DATABASE CONNECTION FAILED \n ${error}`);
});

module.exports = {
  database,
};
