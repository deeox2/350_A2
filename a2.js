const http = require('http');
const sqlite3 = require('sqlite3');
const hostname = '127.0.0.1';
const port = 3000;



let db = new sqlite3.Database('A2.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to Assignment 2 DB');
});

let query = 'SELECT * FROM Users';

db.all(query, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//http://evanhahn.com/understanding-express/
