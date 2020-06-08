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
        console.log(req)
        if (req.status >= 200 && req.status < 400) {
            payload = JSON.parse(req.responseText);
            makeDropdown(payload);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send();
    event.preventDefault();
}

const makeDropdown = (rows) => {
    var sel = document.getElementById('nameDropdown');
    for (const col in rows)
    {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(rows[col].last_name));
        opt.value=rows[col].last_name;
        sel.appendChild(opt);
    }
}