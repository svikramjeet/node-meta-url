  var dotenv = require('dotenv');
    dotenv.load();
  var parseDbUrl = require("parse-database-url");
 var db_url = parseDbUrl(process.env.DATABASE_URL);
 
module.exports = {
  development: {
    database: db_url.database,
    username: db_url.user,
    password: db_url.password,
    host: db_url.host,
    port: db_url.port,
    dialect: 'postgresql',
    define: {
      underscored: false
    },
  },
}