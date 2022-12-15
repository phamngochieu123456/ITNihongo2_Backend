require("dotenv").config()
var mysql = require("mysql")

var session_connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_SESSION_NAME
})

module.exports = session_connection