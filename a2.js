
const express = require('express');
const http = require('http');
const sqlite3 = require('sqlite3');
const app = express();

app.use(function (req, reponse, next) {
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

 var getInfo = function (option) {
   var opts = option || {};
   var query = opts.query || '';

   return function _getInfo(req, res, next) {
    db.all(query, [], (err, rows) => {
      if (err) {
        throw err;
      }
      console.log(rows);

      var str = '';
      rows.forEach(function (row) {
        var tempJson = JSON.stringify(row);
        str = str + (tempJson + '\n');
      });

      res.write(str);
      res.end();
     });

     next();
   }
}

app.use('/users', getInfo({query:'SELECT * FROM Users'}));
app.get('/users', function (req, res) {
});

app.use('/messages', getInfo({query:'SELECT * FROM Messages'}));
app.get('/messages', function (req, res) {
});

app.use('/likes', getInfo({query:'SELECT * FROM Likes'}));
app.get('/likes', function (req, res) {
});

app.use('/contacts', getInfo({query:'SELECT * FROM Contacts'}));
app.get('/contacts', function (req, res) {
});

app.get('*', function (req, res) {
    res.end("404 Page not found");
});


http.createServer(app).listen(3000)
console.log("server running");
console.log("Go to: localhost:3000/users");

//http://evanhahn.com/understanding-express/
