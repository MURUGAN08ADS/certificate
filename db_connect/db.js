// Import the mysql2 package.
// mysql2 allows Node.js to communicate with a MySQL database.
const mysql = require("mysql2");


// Load variables from the .env file into process.env.
// Example:
// DB_HOST=localhost
// becomes:
// process.env.DB_HOST
require("dotenv").config();


// Create a MySQL connection pool.
//
// A connection pool creates and manages multiple database connections.
// When your API receives a request, it can take an available connection
// from the pool instead of creating a new connection every time.
const db = mysql.createPool({

    // Address of the MySQL server.
    // 'localhost' means MySQL is running on your own computer.
    //
    // Example:
    // DB_HOST=localhost
    host: process.env.DB_HOST,


    // Port where MySQL is listening.
    // MySQL normally uses port 3306.
    //
    // Example:
    // DB_PORT=3306
    port: process.env.DB_PORT,


    // MySQL username used by the backend.
    //
    // Example:
    // DB_USER=appuser
    user: process.env.DB_USER,


    // Password for the MySQL user.
    //
    // Example:
    // DB_PASSWORD=yourStrongPassword
    password: process.env.DB_PASSWORD,


    // Database/schema that the backend wants to work with.
    //
    // Example:
    // DB_NAME=college
    //
    // This means SQL queries will work against the 'college' database.
    database: process.env.DB_NAME
});


// Try to get one connection from the connection pool.
//
// This is mainly being used here to test whether the database
// configuration is valid and MySQL accepts the connection.
db.getConnection((err, connection) => {


    // Check whether MySQL returned an error.
    if (err) {

        // Print the reason why the connection failed.
        //
        // Example:
        // Database connection failed:
        // Access denied for user 'appuser'@'localhost'
        console.log("Database connection failed:", err.message);

        // Stop executing this callback.
        return;
    }


    // If we reach here, the connection was successful.
    console.log("MySQL connected successfully");


    // Return the connection back to the connection pool.
    //
    // We borrowed a connection using getConnection().
    // After testing/using it, we release it so another request
    // can use that connection.
    connection.release();
});


// Export the database pool.
//
// This allows other files, such as server.js,
// controllers, or repositories, to use this same database pool.
//
// Example:
// const db = require("./db");
module.exports = db;