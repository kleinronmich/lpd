const baseURL = `http://flip2.engr.oregonstate.edu:5065`;
//const baseURL = `http://localhost:5064`;

var payload = {};

document.addEventListener('DOMContentLoaded', bindbuttons);

function bindbuttons() {
    loadSeasonDropDown();
    loadTeamDropDown();
    makeWeekDropDown();
    loadTable();
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

const loadTeamDropDown = () => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL + "/loadTeamNames", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            payload = JSON.parse(req.responseText);
            makeHomeDropdown(payload);
            makeAwayDropdown(payload);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send();
    event.preventDefault();
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

const makeHomeDropdown = (rows) => {
    var sel = document.getElementById('homeDropdown');
    for (const col in rows) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(rows[col].last_name));
        opt.label = rows[col].last_name;
        opt.value = rows[col].team_id;
        sel.appendChild(opt);
    }
};

const makeAwayDropdown = (rows) => {
    var sel = document.getElementById('awayDropdown');
    for (const col in rows) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(rows[col].last_name));
        opt.label = rows[col].last_name;
        opt.value = rows[col].team_id;
        sel.appendChild(opt);
    }
};

const makeWeekDropDown = () => {
    var sel = document.getElementById('weekDropdown');
    for (var i = 1; i < 14; i++) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(i));
        opt.value = i;
        sel.appendChild(opt);
    };
};

const loadTable = () => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL + "/loadMatchups", true);
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

document.getElementById("insertMatchup").addEventListener("click", () => {
    var req = new XMLHttpRequest();
    var updatePayload = {
        season_id: null,
        week: null,
        home_team_id: null,
        away_team_id: null,
        home_team_score: null,
        away_team_score: null
    };

    var yearDropDown = document.getElementById("yearDropdown");
    year = yearDropDown.options[yearDropDown.selectedIndex].value;
    updatePayload.season_id = year;

    var weekDropdown = document.getElementById("weekDropdown");
    week = weekDropdown.options[weekDropdown.selectedIndex].value;
    updatePayload.week = week;

    var hometeamDropDown = document.getElementById("homeDropdown");
    home_team = hometeamDropDown.options[hometeamDropDown.selectedIndex].value;
    updatePayload.home_team_id = home_team;

    var awayteamDropDown = document.getElementById("awayDropdown");
    away_team = awayteamDropDown.options[awayteamDropDown.selectedIndex].value;
    updatePayload.away_team_id = away_team;

    updatePayload.home_team_score = document.getElementById("home_team_score").value;
    updatePayload.away_team_score = document.getElementById("away_team_score").value;

    console.log(updatePayload);

    req.open('POST', baseURL + "/insertMatchup", true);
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