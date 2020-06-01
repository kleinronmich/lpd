var mysql = require('./dbcon.js');
var express = require('express');
var app = express();
var cors = require('cors');
const path = require('path');
//app.use(express.static(__dirname));
app.use(cors());


app.get("/", function(req, res) {

//res.sendFile(path.join(__dirname + '/index.html'));
res.send("Console is running");
});

//Query to load all teams rows and send as a JSON string
app.get("/loadTeams", function(req, res) {

    var q = "SELECT * from teams";
    
    mysql.pool.query(q, function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
});
});


//Query to insert into Teams table on Teams Admin page


//Query to update Teams table on Teams Admin page


//Query to delete from Teams table on Teams Admin page


//Query to load all seasons rows and send as a JSON string
app.get("/loadSeasons", function(req, res) {

    var q = "SELECT * from seasons";
    
    mysql.pool.query(q, function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
});
});


//Query to insert into seasons table on Seasons Admin page



//Query to load all season teams rows and send as a JSON string
app.get("/loadSeasonTeams", function(req, res) {

    var q = "SELECT * from season_teams";
    
    mysql.pool.query(q, function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
});
});


//Query to insert into season teams table on Season Teams Admin page



//Query to load all league dues rows and send as a JSON string
app.get("/loadDues", function(req, res) {

    var q = "SELECT * from league_dues";
    
    mysql.pool.query(q, function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
});
});


//Query to insert into league_dues table on Dues Admin page



//Query to load all matchups rows and send as a JSON string
app.get("/loadMatchups", function(req, res) {

    var q = "SELECT * from matchups";
    
    mysql.pool.query(q, function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
});
});


//Query to insert into matchups table on Matchups Admin page



//Query to select overall records for selected team on Teams page



//Query to select overall records for all teams based on criteria
//on the Standings page


//Query to select all matchups between two selected temas



//Query to calculate and display overall record between those teams



//Query to select the sums of overall winnings in a table for each
//team






app.listen(5064, function() {
    console.log("App listening on port 5064");
});