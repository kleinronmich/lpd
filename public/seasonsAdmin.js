const baseURL = `http://flip2.engr.oregonstate.edu:5065`;

var payload = {};

document.addEventListener('DOMContentLoaded', bindbuttons);

function bindbuttons() {
    loadDropDowns()
    loadTable();
}

const loadDropDowns = () => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL + "/loadTeamNames", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            payload = JSON.parse(req.responseText);
            makeChampionDropdown(payload);
            makeRunnerDropdown(payload);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send();
    event.preventDefault();
};

const makeChampionDropdown = (rows) => {
    var sel = document.getElementById('championDropdown');
    for (const col in rows) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(rows[col].last_name));
        opt.label = rows[col].last_name;
        opt.value = rows[col].team_id;
        sel.appendChild(opt);
    }
};

const makeRunnerDropdown = (rows) => {
    var sel = document.getElementById('runnerDropdown');
    for (const col in rows) {
        var optR = document.createElement('option');
        optR.appendChild(document.createTextNode(rows[col].last_name));
        optR.label = rows[col].last_name;
        optR.value = rows[col].team_id;
        sel.appendChild(optR);
    }
};

const loadTable = () => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL + "/loadSeasons", true);
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

document.getElementById("insertSeason").addEventListener("click", () => {
    var req = new XMLHttpRequest();
    var updatePayload = { year: null, championship_team_id: null, runner_up_id: null };

    updatePayload.year = document.getElementById("year").value;

    var champDropDown = document.getElementById("championDropdown");
    champ_team_id = champDropDown.options[champDropDown.selectedIndex].value;
    updatePayload.championship_team_id = champ_team_id;

    var runnerDropDown = document.getElementById("runnerDropdown");
    runner_team_id = runnerDropDown.options[runnerDropDown.selectedIndex].value;
    updatePayload.runner_up_id = runner_team_id;

    console.log(updatePayload);

    req.open('POST', baseURL + "/insertSeason", true);
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