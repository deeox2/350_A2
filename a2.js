/*
CMPT 350 - Assignment 2 - Web Programming
Johann Doell - jsd090 - 11241188
*/

// Import statements
const express = require('express');
const http = require('http');
const sqlite3 = require('sqlite3');
const app = express();

// Basic express set up.
app.use(function (req, reponse, next) {
  reponse.writeHead(200, { 'Content-Type': 'text/plain'});
  next();
});

// Set up DB
let db = new sqlite3.Database('assignment2.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to database: assignment2.db');
});
 // Middleware function
 var getInfo = function (options) {
   var opt = options || {};
   var query = opt.query || '';
   // Internal function for middleware.
   return function _getInfo(req, response, next) {
    db.all(query, [], (err, rows) => {
      if (err) {
        throw err;
      }
      // Debug to console: table content.
      console.log("Database contents:")
      console.log(rows);
      var output = '';
      rows.forEach(function (row) {
        var strAsJson = JSON.stringify(row);
        output = output + (strAsJson + '\n');
      });
      response.write(output);
      response.end();
     });
     next();
   }
}

// Express use methods
app.use('/users', getInfo({query:'SELECT * FROM Users'}));
app.use('/messages', getInfo({query:'SELECT * FROM Messages'}));
app.use('/likes', getInfo({query:'SELECT * FROM Likes'}));
app.use('/contacts', getInfo({query:'SELECT * FROM Contacts'}));

// Express get methods
app.get('/users', function (req, res) {});
app.get('/messages', function (req, res) {});
app.get('/likes', function (req, res) {});
app.get('/contacts', function (req, res) {});

// Any other page
app.get('*', function (req, res) {
    res.end("Error 404: Page not found.");
});

// Create server.
http.createServer(app).listen(3000)
console.log("a2.js successfully started.");
console.log("Server Running at: localhost:3000");
