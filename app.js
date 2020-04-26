const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Pool = require('pg').Pool



/*
PostgreSQL
*/

//TODO: add your postgres connection setting here
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'airbnb',
  password: 'Asdqwe123!',
  port: 5432,
})



//Initial Root Route. localhost:3000/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//Send all database info in json file to client
app.get('/json', (req, res) =>{
  let jsonToSend = [];

  //TODO: Send all rows for database
  //you should probably have a nested query for each table
  //then add it to the jsonToSend array
  pool.query('SELECT * FROM listingnewyork;' ,(error, results) => {
    if (error) {
      throw error
    }
     jsonToSend.push(results.rows);
    //console.log(jsonToSend);
    res.json(jsonToSend);
  })
});



//==========================================================================
app.use(express.static(__dirname + '/HTML'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/CSS'));
app.use(express.static(__dirname + '/'));


app.listen(8080, () => {console.log("started port 8080");});
