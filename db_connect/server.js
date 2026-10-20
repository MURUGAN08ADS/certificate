// Import the Express framework.
// Used to create the backend server and define API endpoints.
const express = require("express");

// Import the database connection/pool from db.js.
// Used whenever we want to execute SQL queries on MySQL.
const db = require("./db");

// Load variables from the .env file into process.env.
// Example: process.env.DB_USER, process.env.DB_PASSWORD, etc.
require("dotenv").config();

// Create an Express application.
// 'app' is now used to define routes and start the server.
const app = express();

// Middleware that tells Express to understand JSON request bodies.
// Without this, req.body may not contain JSON sent by Postman/frontend.
app.use(express.json());


// ==========================================================
// GET /
// ==========================================================

// Create a GET API endpoint for the root URL.
// Runs when someone sends:
// GET http://localhost:3000/
app.get("/", (req, res) => {

    // Send a simple text response back to the client.
    // Useful for checking whether the backend is running.
    res.send("Backend is running");
});


// ==========================================================
// POST /
// ==========================================================

// Create a POST API endpoint for the root URL.
// Runs when someone sends:
// POST http://localhost:3000/
app.post("/", (req, res) => {

    // Print the data received from Postman/frontend in the terminal.
    // req.body contains the JSON sent by the client.
    console.log(req.body);

    // Send a JSON response back to Postman/frontend.
    res.json({

        // Message telling the client that the POST request was received.
        message: "POST request received",

        // Send the same data that the client submitted back to it.
        data: req.body
    });
});


// ==========================================================
// POST /students
// ==========================================================

// Create an API endpoint for creating a new student.
// Runs when someone sends:
// POST http://localhost:3000/students
app.post("/students", (req, res) => {

    // Extract name, email, and department from the JSON request body.
    //
    // Example req.body:
    // {
    //     "name": "Murugan",
    //     "email": "murugan@gmail.com",
    //     "department": "CSE"
    // }
    //
    // After destructuring:
    // name = "Murugan"
    // email = "murugan@gmail.com"
    // department = "CSE"
    const { name, email, department } = req.body;


    // Create the SQL query that will insert a student into MySQL.
    //
    // The ? symbols are placeholders.
    // The actual values are provided separately below.
    const sql = `
        INSERT INTO students (name, email, department)
        VALUES (?, ?, ?)
    `;


    // Execute the SQL query using the MySQL connection.
    //
    // First argument:
    //     sql
    //     → SQL command to execute.
    //
    // Second argument:
    //     [name, email, department]
    //     → Values that replace the ? placeholders in order.
    //
    // Third argument:
    //     callback function
    //     → Runs after MySQL finishes executing the query.
    db.query(sql, [name, email, department], (err, result) => {


        // Check whether MySQL returned an error.
        // Examples:
        // - table doesn't exist
        // - database permission problem
        // - invalid SQL
        // - duplicate value
        if (err) {

            // Send HTTP 500 (Internal Server Error) to the client.
            //
            // return stops the function here so the success response
            // below does not execute.
            return res.status(500).json({

                // Send the actual MySQL error message.
                error: err.message
            });
        }


        // If there was no error, the INSERT was successful.
        //
        // 201 means "Created".
        // It is commonly used when a new record/resource was created.
        res.status(201).json({

            // Message sent back to Postman/frontend.
            message: "Student created successfully",

            // MySQL automatically generated an ID because our table
            // uses AUTO_INCREMENT.
            //
            // result.insertId contains that newly generated ID.
            studentId: result.insertId
        });
    });
});


// ==========================================================
// START SERVER
// ==========================================================

// Start the Express server and listen for HTTP requests
// on port 3000.
//
// The backend will be accessible at:
// http://localhost:3000
app.listen(3000, () => {

    // Print a message in the terminal so we know the server started.
    console.log("Server running on port 3000");
});