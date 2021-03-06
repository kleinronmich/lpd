const baseURL = `http://flip2.engr.oregonstate.edu:5065`;
//const baseURL = `http://localhost:5064`;

var payload = {};

document.addEventListener('DOMContentLoaded', bindbuttons);

function bindbuttons() {
    loadSeasonDropDown();
    loadTeamDropDown();
    PlayoffDropDown = [{ "text": "No", "value": 0 }, { "text": "Yes", "value": 1 }];
    makePlayoffDropdown(PlayoffDropDown);
    loadTable();
};

const loadTeamDropDown = () => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL + "/loadTeamNames", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            payload = JSON.parse(req.responseText);
            makeNameDropdown(payload);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send();
    event.preventDefault();
};

const loadSeasonDropDown = () => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL + "/loadSeasonsAndIDs", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            payload = JSON.parse(req.responseText);
            makeYearDropdown(payload);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send();
    event.preventDefault();
};

const makeNameDropdown = (rows) => {
    var sel = document.getElementById('nameDropdown');
    for (const col in rows) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(rows[col].last_name));
        opt.label = rows[col].last_name;
        opt.value = rows[col].team_id;
        sel.appendChild(opt);
    }
};

const makeYearDropdown = (rows) => {
    var sel = document.getElementById('yearDropdown');
    for (const col in rows) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(rows[col].last_name));
        opt.label = rows[col].year;
        opt.value = rows[col].season_id;
        sel.appendChild(opt);
    }
};

const makePlayoffDropdown = (rows) => {
    var sel = document.getElementById('playoffDropdown');
    for (const col in rows) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(rows[col].last_name));
        opt.label = rows[col].text;
        opt.value = rows[col].value;
        sel.appendChild(opt);
    }
};



const loadTable = () => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL + "/loadSeasonTeams", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            payload = JSON.parse(req.responseText);
            makeTable(payload);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send();
    event.preventDefault();
}

document.getElementById("insertSeasonTeam").addEventListener("click", () => {
    var req = new XMLHttpRequest();

    var updatePayload = {
        season_id: null,
        team_id: null,
        made_playoffs: null,
        wins: null,
        losses: null,
        ties: null,
        points_scored: null,
        points_against: null
    };

    var yearDropDown = document.getElementById("yearDropdown");
    year = yearDropDown.options[yearDropDown.selectedIndex].value;
    updatePayload.season_id = year;

    var teamDropDown = document.getElementById("nameDropdown");
    team = teamDropDown.options[teamDropDown.selectedIndex].value;
    updatePayload.team_id = team;

    var playoffDropDown = document.getElementById("playoffDropdown");
    playoffs = playoffDropDown.options[playoffDropDown.selectedIndex].value;
    updatePayload.made_playoffs = playoffs;


    updatePayload.wins = document.getElementById("wins").value;
    updatePayload.losses = document.getElementById("losses").value;
    updatePayload.ties = document.getElementById("ties").value;
    updatePayload.points_scored = document.getElementById("points_scored").value;
    updatePayload.points_against = document.getElementById("points_against").value;

    console.log(updatePayload);

    req.open('POST', baseURL + "/insertSeasonTeam", true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            deleteTable();
            loadTable();
        } else {
            var errorMessage = "Error: " + res.statusText;
            console.log(errorMessage);
        }
    });
    req.send(JSON.stringify(updatePayload));
    event.preventDefault();
});

const makeTable = (allRows) => {
    var body = document.getElementsByTagName("body")[0];
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    tbl.className = "table";


    for (var i = 0; i < allRows.length + 1; i++) {
        if (i == 0) {
            let headers = Object.keys(allRows[0]);
            makeHeader(tblBody, headers);
        } else {
            makeRow(tblBody, payload[i - 1]);
        }
    }

    tbl.appendChild(tblBody);
    body.appendChild(tbl);

};

const makeHeader = (tblBody, columns) => {
    var newRow = document.createElement("tr");

    for (let key of columns) {
        var headerCell = document.createElement("th");
        var headerCellText = document.createTextNode(key);
        headerCell.appendChild(headerCellText);
        newRow.appendChild(headerCell);
    }
    tblBody.appendChild(newRow);
};

const makeRow = (tblBody, row) => {

    var newRow = document.createElement("tr");


    for (const col in row) {
        var cell = document.createElement("td");
        var cellText = document.createTextNode(row[col]);
        cell.appendChild(cellText);
        newRow.appendChild(cell);
    }
    tblBody.appendChild(newRow);
};

const deleteTable = () => {
    try {
        var tblRemove = document.getElementById("table");
        tblRemove.remove();
    } catch {
        location.reload();
    }
};