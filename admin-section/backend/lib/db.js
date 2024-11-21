require('dotenv').config();
let mysql = require('mysql');

const db_admin = process.env.AWS_DATABASE_ADMIN;
const db_password = process.env.AWS_DATABASE_PASSWORD;
const host = process.env.AWS_DATABASE_HOST;
const port = process.env.AWS_DATABASE_PORT;
const db_name = process.env.AWS_DATABASE_NAME;

let connection = mysql.createPool({
    connectionLimit: 10,
    host: host,
    user: db_admin,
    password: db_password,
    database: db_name
});

module.exports = {
    connection
}