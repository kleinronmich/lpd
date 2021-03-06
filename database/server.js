var mysql = require('./dbcon.js');
var express = require('express');
var app = express();
var cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.set('port', 5065);

// Standard to check if server is running - not actually used
app.get("/", function(req, res) {
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
app.post('/insertTeam', function(req, res, next) {

    var { first_name, last_name, active_member } = req.body;
    var q = "INSERT INTO teams (`first_name`, `last_name`, `active_member`) VALUES (?,?,?)";

    mysql.pool.query(q, [first_name, last_name, active_member], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.sendStatus(200);
    });
});

//Query to update Teams table on Teams Admin page
app.put('/updateTeam', function(req, res, next) {

    var { team_id, first_name, last_name, active_member } = req.body;
    var q = "UPDATE teams SET first_name=?, last_name=?, active_member=? WHERE team_id=?";

    mysql.pool.query(q, [first_name, last_name, active_member, team_id], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.sendStatus(200);
    });
});

//Query to delete from Teams table on Teams Admin page
app.delete('/deleteTeam', function(req, res, next) {

    var q = "DELETE FROM teams WHERE team_id=?";

    mysql.pool.query(q, req.body.id, (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.sendStatus(200);
    });
});

//Query to load all seasons rows and send as a JSON string
app.get("/loadSeasons", function(req, res) {

    var q = "SELECT * from seasons";

    mysql.pool.query(q, function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
    });
});

// Query to get seasons and ids for drop down selectors
app.get("/loadSeasonsAndIDs", function(req, res) {
    var q = "SELECT season_id, year from seasons";

    mysql.pool.query(q, function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
    });
});

//Query to insert into seasons table on Seasons Admin page
app.post('/insertSeason', function(req, res, next) {

    var { year, championship_team_id, runner_up_id } = req.body;
    var q = "INSERT INTO seasons (`year`, `championship_team_id`, `runner_up_id`) VALUES (?,?,?)";

    mysql.pool.query(q, [year, championship_team_id, runner_up_id], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.sendStatus(200);
    });
});


//Query to load all season teams rows and send as a JSON string
app.get("/loadSeasonTeams", function(req, res) {

    var q = "SELECT * from season_teams";

    mysql.pool.query(q, function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
    });
});


//Query to insert into season teams table on Season Teams Admin page
app.post('/insertSeasonTeam', function(req, res, next) {

    var { season_id, team_id, made_playoffs, wins, losses, ties, points_scored, points_against } = req.body;
    var q = "INSERT INTO season_teams (`season_id`, `team_id`, `made_playoffs`, `wins`, `losses`, `ties`, `points_scored`, `points_against`) VALUES (?,?,?,?,?,?,?,?)";

    mysql.pool.query(q, [season_id, team_id, made_playoffs, wins, losses, ties, points_scored, points_against], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.sendStatus(200);
    });
});


//Query to load all league dues rows and send as a JSON string
app.get("/loadDues", function(req, res) {

    var q = "SELECT * from league_dues";

    mysql.pool.query(q, function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
    });
});


//Query to insert into league_dues table on Dues Admin page
app.post('/insertDues', function(req, res, next) {

    var { season_id, team_id, amount } = req.body;
    var q = "INSERT INTO league_dues (`season_id`, `team_id`, `amount`) VALUES (?,?,?)";

    mysql.pool.query(q, [season_id, team_id, amount], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.sendStatus(200);
    });
});


//Query to load all matchups rows and send as a JSON string
app.get("/loadMatchups", function(req, res) {

    var q = "SELECT * from matchups";

    mysql.pool.query(q, function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
    });
});


//Query to insert into matchups table on Matchups Admin page
app.post('/insertMatchup', function(req, res, next) {

    var { season_id, week, home_team_id, away_team_id, home_team_score, away_team_score } = req.body;
    var q = "INSERT INTO matchups (`season_id`, `week`, `home_team_id`, `away_team_id`, `home_team_score`, `away_team_score`) VALUES (?,?,?,?,?,?)";

    mysql.pool.query(q, [season_id, week, home_team_id, away_team_id, home_team_score, away_team_score], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.sendStatus(200);
    });
});


//Query to select the sums of overall winnings in a table for each team
app.get("/loadWinnings", function(req, res) {

    var q = "select first_name as 'First Name', last_name as 'Last Name', sum(amount) as Winnings from league_dues ld " +
        "JOIN teams t ON t.team_id = ld.team_id " +
        "GROUP BY 1,2 " +
        "ORDER BY Winnings DESC";

    mysql.pool.query(q, function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
    });
});


//Load Team names into a dropdown, on button click grab records by year
app.get("/loadTeamNames", function(req, res) {

    var q = "SELECT team_id, last_name from teams";

    mysql.pool.query(q, function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
    });
});

// Query for matchups page to return table and winners used for front-end work
app.post("/loadTeamNames", function(req, res, next) {
    var team_id = req.body.team_id;
    console.log(team_id);
    var q = `SELECT year as 'Year', wins as 'Wins', losses as "Losses", ties as "Ties", points_scored as "Points Scored", points_against as "Points Against", made_playoffs as "Made Playoffs" from season_teams st
    Join seasons s ON s.season_id = st.season_id
    Where team_id = ?;`;

    mysql.pool.query(q, team_id, (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.send(JSON.stringify(result));
    });
});

// Query for overall standings page
app.get("/loadStandings", function(req, res) {

    var q = "select first_name as 'First Name', last_name as 'Last Name', sum(wins) as Wins, sum(losses) as Losses, sum(ties) as Ties, " +
        "CONCAT(CAST((sum(wins)*100/sum(wins+losses+ties)) AS CHAR(5)),'%') as WinningPct, " +
        "sum(made_playoffs) as 'Playoff Appearances' from season_teams st " +
        "JOIN teams t ON t.team_id = st.team_id " +
        "GROUP BY 1,2 " +
        "ORDER BY Wins DESC, WinningPct DESC";

    mysql.pool.query(q, function(err, rows, fields) {
        if (err) throw err;
        res.send(JSON.stringify(rows));
    });
});

//Query to select all matchups between two selected temas
app.post("/loadMatchupsbyTeams", function(req, res, next) {

    var home_team_id = req.body.team_id_1;
    var away_team_id = req.body.team_id_2;

    var q = `SELECT year, week, home_team_id, away_team_id, home_team_score, away_team_score, CASE when home_team_score > away_team_score then home_team_id else away_team_id END as "Winner" FROM matchups m Join seasons s on s.season_id = m.season_id Join teams t on t.team_id = m.home_team_id WHERE (home_team_id = ? AND away_team_id = ?) OR (home_team_id = ? AND away_team_id = ?);`

    console.log(home_team_id);
    console.log(away_team_id);


    mysql.pool.query(q, [home_team_id, away_team_id, away_team_id, home_team_id], (err, result) => {
        if (err) {
            next(err);
            return;
        }
        res.send(JSON.stringify(result));
    });
});


// Listen on server 
app.listen(app.get('port'), function() {
    console.log('Express started on http://flip2.engr/oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});