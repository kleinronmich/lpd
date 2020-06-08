const baseURL = `http://flip2.engr.oregonstate.edu:5065`;
//const baseURL = `http://localhost:5064`;

var payload = {};

document.addEventListener('DOMContentLoaded', bindbuttons);

function bindbuttons() {
    loadTable();
}

const loadTable = () => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL + "/loadTeams", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            payload = JSON.parse(req.responseText);
            makeTable(payload);
            loadUpdateAndDelete();
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send();
    event.preventDefault();
}

document.getElementById("insertTeam").addEventListener("click", () => {
    var req = new XMLHttpRequest();
    var updatePayload = { first_name: null, last_name: null, active_member: null };

    updatePayload.first_name = document.getElementById("first_name").value;
    updatePayload.last_name = document.getElementById("last_name").value;
    active = document.querySelector('input[name="active_member"]:checked').value;
    updatePayload.active_member = active;


    console.log(updatePayload);

    req.open('POST', baseURL + "/insertTeam", true);
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
    var frm = document.createElement("form");
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    tbl.className = "table";
    tbl.id = "table";


    for (var i = 0; i < allRows.length + 1; i++) {
        if (i == 0) {
            let headers = Object.keys(allRows[0]);
            makeHeader(tblBody, headers);
        } else {
            makeRow(tblBody, allRows[i - 1]);
        }
    }

    tbl.appendChild(tblBody);
    frm.appendChild(tbl);
    body.appendChild(frm);

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
        if (col == "team_id") {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(row[col]);
            cell.appendChild(cellText);
            newRow.appendChild(cell);
        } else if (col == "first_name") {
            makeFirstNameInput(row[col], newRow);
        } else if (col == "last_name") {
            makeLastNameInput(row[col], newRow);
        } else if (col == "active_member") {
            makeActiveInput(row[col], newRow);
        }
    }
    makeUpdateButton(newRow);
    makeDeleteButton(newRow);
    tblBody.appendChild(newRow);

};

const makeFirstNameInput = (val, domRow) => {
    var cell = document.createElement("td");
    var textIn = document.createElement("INPUT");
    textIn.setAttribute("type", "text");
    textIn.id = "firstNameUpdate";
    textIn.disabled = true;
    textIn.value = val;
    cell.appendChild(textIn);
    domRow.appendChild(cell);
}

const makeLastNameInput = (val, domRow) => {
    var cell = document.createElement("td");
    var textIn = document.createElement("INPUT");
    textIn.setAttribute("type", "text");
    textIn.id = "lastNameUpdate";
    textIn.disabled = true;
    textIn.value = val;
    cell.appendChild(textIn);
    domRow.appendChild(cell);
}

const makeActiveInput = (val, domRow) => {
    var cell = document.createElement("td");
    var textIn = document.createElement("INPUT");
    textIn.setAttribute("type", "text");
    textIn.id = "activeUpdate";
    textIn.disabled = true;
    if (val == 1) {
        textIn.value = "yes"
    } else {
        textIn.value = "no"
    }
    cell.appendChild(textIn);
    domRow.appendChild(cell);
}

const makeUpdateButton = (domROW) => {
    var newButton = document.createElement('input');
    newButton.type = "button";
    newButton.class = "btn";
    newButton.value = "Edit";
    var cell = document.createElement("td");
    newButton.id = "updateRowButton";
    cell.appendChild(newButton);
    domROW.appendChild(cell);
};

const makeDeleteButton = (domROW) => {
    var newButton = document.createElement('input');
    newButton.type = "button";
    newButton.class = "btn";
    newButton.value = "Delete";
    var cell = document.createElement("td");
    newButton.id = "deleteRowButton";
    cell.appendChild(newButton);
    domROW.appendChild(cell);
};

const deleteTable = () => {
    try {
        var tblRemove = document.getElementById("table");
        tblRemove.remove();
    } catch {
        location.reload();
    }
};

const loadUpdateAndDelete = () => {
    var table = document.getElementById("table");
    var clicks = 0;
    table.onclick = function(event) {
        let target = event.target;

        if (target.id == "deleteRowButton") {
            keyID = target.parentNode.parentNode.firstChild.firstChild;
            deleteData = keyID.data;
            deleteRequest(deleteData)
        }
        if (target.id == "updateRowButton") {
            clicks++;
            console.log(clicks);
            if (clicks == 1) {
                keyID = target.parentNode.parentNode.firstChild.firstChild.data;
                rowUpdate = target.parentNode.parentNode;
                rowUpdate.children[4].firstChild.value = "Update";
                for (let i = 1; i < 4; i++) {
                    rowUpdate.children[i].firstChild.disabled = false;
                }
            } else if (clicks == 2) {
                updateRequest(rowUpdate)
                click = 0;
            } else clicks = 0;
        }

    }
};

function deleteRequest(key) {
    var req = new XMLHttpRequest();
    var deletePayload = { id: key };


    req.open('DELETE', baseURL + "/deleteTeam", true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            deleteTable();
            loadTable();
        } else {
            var errorMessage = "Error: ";
            console.log(errorMessage);
        }
    });
    req.send(JSON.stringify(deletePayload));
    event.preventDefault();
};

function updateRequest(domRow) {
    var req = new XMLHttpRequest();
    var updatePayload = { team_id: null, first_name: null, last_name: null, active_member: null };
    var unitNum;

    updatePayload.team_id = rowUpdate.children[0].firstChild.data;
    updatePayload.first_name = rowUpdate.children[1].firstChild.value;
    updatePayload.last_name = rowUpdate.children[2].firstChild.value;
    if (rowUpdate.children[3].firstChild.value == "no") {
        unitNum = 0;
    } else if (rowUpdate.children[3].firstChild.value == "yes") {
        unitNum = 1;
    } else {
        alert("Input is incorrect please enter yes/no, Page will now reload");
        location.reload();
    }
    updatePayload.active_member = unitNum;

    console.log(updatePayload);


    req.open('PUT', baseURL + "/updateTeam", true);
    req.setRequestHeader('Content-Type', 'application/json');

    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            deleteTable();
            loadTable();
        } else {
            var errorMessage = "Error: " + response.statusText;
            console.log(errorMessage);
        }
    });
    req.send(JSON.stringify(updatePayload));
    event.preventDefault();

}