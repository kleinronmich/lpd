const baseURL = `http://flip3.engr.oregonstate.edu:2369`;

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
    team_id_2 = dropdown2.options[dropdown2.selectedIndex].value;

    updatePayload.team_id_1 = team_id_1;
    updatePayload.team_id_2 = team_id_2;


    console.log(updatePayload);
    /*
    req.open('POST', baseURL + "/loadTeamNames", true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            payload = JSON.parse(req.responseText);
            deleteTable();
            makeTable(payload);
        } else {
            var errorMessage = "Error: " + res.statusText;
            console.log(errorMessage);
        }
    });
    req.send(JSON.stringify(updatePayload));
    event.preventDefault();
    */
});