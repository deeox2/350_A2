
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

  db.close();
  //reponse.end();

});


app.get('/messages', function (request, reponse) {
  reponse.end("Messages table");
});


app.get('/likes', function (request, reponse) {
  reponse.end("Likes table");
});


app.get('/contacts', function (request, reponse) {
  reponse.end("Contacts table");
});


app.get('*', function (request, reponse) {
  reponse.end('404 page not found')
});


http.createServer(app).listen(3000)

//http://evanhahn.com/understanding-express/
