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
    database: db_name,
    port: port
});

module.exports = {
    connection
}



// --- Short summary of how createPool is helping here ---
// connects to the database (aws rds)
// Has a potential to handle 10 connections thanks to 'connectionLimit' attribute
// imagine it like this
// there is a staging aread where connections are made, destroyed or fetched for utilization
// when query is run, two posssible actions can happen
    // 1. if there is no connection in the staging area, a new connection is made and query is executed on that. 
    // 2. if there exist a free connection(idle - not in use), query will use that connection
    // ( additionally if connection limit is crossed, the query will just wait for some connection to be free or
    //   to be closed so it can create its own. However it finds suitable)
// This staging area is called 'pool'