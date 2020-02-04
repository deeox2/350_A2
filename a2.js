
const express = require('express');
const http = require('http');
const sqlite3 = require('sqlite3');
const app = express();

app.use(function (request, reponse, next) {
  reponse.writeHead(200, { 'Content-Type': 'text/plain'});
  next();
});


// Database set up
let db = new sqlite3.Database('A2.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to Assignment 2 DB');
});



app.get('/users', function (request, reponse) {


  db.all('SELECT * FROM Users', [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);
    var myJson = JSON.stringify(rows);
    reponse.write(myJson);
    reponse.end();
   });




});


app.get('/messages', function (request, reponse) {
  db.all('SELECT * FROM Messages', [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);
    var myJson = JSON.stringify(rows);
    reponse.write(myJson);
    reponse.end();
   });


});


app.get('/likes', function (request, reponse) {
  db.all('SELECT * FROM Likes', [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);
    var myJson = JSON.stringify(rows);
    reponse.write(myJson);
    reponse.end();
   });


});


app.get('/contacts', function (request, reponse) {
  db.all('SELECT * FROM Contacts', [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);
    var myJson = JSON.stringify(rows);
    reponse.write(myJson);
    reponse.end();
   });

});


app.get('*', function (request, reponse) {
    reponse.end("404 Page not found");

});


http.createServer(app).listen(3000)

//http://evanhahn.com/understanding-express/
