const baseURL = `http://flip2.engr.oregonstate.edu:5065`;

var payload = {};

document.addEventListener('DOMContentLoaded', bindbuttons);

function bindbuttons() {
    loadDropdown();
}

const loadDropdown = () => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL + "/loadTeamNames", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            payload = JSON.parse(req.responseText);
            makeDropdown1(payload);
            makeDropdown2(payload);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send();
    event.preventDefault();
}

const makeDropdown1 = (rows) => {
    var sel = document.getElementById('nameDropdown1');
    for (const col in rows) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(rows[col].last_name));
        opt.label = rows[col].last_name;
        opt.value = rows[col].team_id;
        sel.appendChild(opt);
    }
}

const makeDropdown2 = (rows) => {
    var sel = document.getElementById('nameDropdown2');
    for (const col in rows) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(rows[col].last_name));
        opt.label = rows[col].last_name;
        opt.value = rows[col].team_id;
        sel.appendChild(opt);
    }
}

document.getElementById("nameSubmit").addEventListener("click", () => {
    var req = new XMLHttpRequest();

    var dropdown1 = document.getElementById('nameDropdown1');
    var dropdown2 = document.getElementById('nameDropdown2');

    var updatePayload = { team_id_1: null, team_id_2: null };

    team_id_1 = dropdown1.options[dropdown1.selectedIndex].value;
    team_1_name = dropdown1.options[dropdown1.selectedIndex].label;
    team_id_2 = dropdown2.options[dropdown2.selectedIndex].value;
    team_2_name = dropdown2.options[dropdown2.selectedIndex].label;

    updatePayload.team_id_1 = team_id_1;
    updatePayload.team_id_2 = team_id_2;

    req.open('POST', baseURL + "/loadMatchupsbyTeams", true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            payload = JSON.parse(req.responseText);
            makeRecord(team_id_1, team_id_2, payload, team_1_name, team_2_name);
            makeTable(payload);
        } else {
            var errorMessage = "Error: " + res.statusText;
            console.log(errorMessage);
        }
    });
    req.send(JSON.stringify(updatePayload));
    event.preventDefault();

});

const makeRecord = (id_1, id_2, allrows, team_1_name, team_2_name) => {
    var body = document.getElementsByTagName("body")[0];
    var div = document.createElement("div");
    var p1 = document.createElement("p");

    var text = document.createTextNode(``)

    count_team_1_wins = 0;
    count_team_2_wins = 0;

    for (var i = 0; i < allrows.length; i++) {
        if (payload[0].Winner == id_1) {
            count_team_1_wins += 1;
        } else {
            count_team_2_wins += 1;
        }

    };

    if (count_team_1_wins > count_team_2_wins) {
        text = `${team_1_name} leads the series ${count_team_1_wins}-${count_team_2_wins} over ${team_2_name}`;
    } else if (count_team_1_wins == count_team_2_wins) {
        text = `Series is tied`;
    } else {
        text = `${team_2_name} leads the series ${count_team_2_wins}-${count_team_1_wins} over ${team_1_name}`;
    }

    var line = document.createTextNode(text);
    p1.style.textAlign = "center";
    p1.style.fontWeight = "bold";
    p1.appendChild(line);
    div.appendChild(p1);
    body.appendChild(div);

}

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