const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "localhost",
    database: "pos",
});

connection.connect((err) => {
    if (err) {
        console.error(`Error connecting to DB: ${err.stack}`);
        return;
    }
    console.log(`Successfully connected to DB as ID: ${connection.threadId}`);
});

module.exports = connection;
