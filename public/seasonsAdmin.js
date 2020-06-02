//const baseURL = `http://flip2.engr.oregonstate.edu:5065`;
const baseURL = `http://localhost:5064`;

var payload = {};

document.addEventListener('DOMContentLoaded', (event) => {
    var req = new XMLHttpRequest();
    req.open("GET", baseURL + "/loadSeasons", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        console.log(req)
        if (req.status >= 200 && req.status < 400) {
            payload = JSON.parse(req.responseText);
            makeTable(payload);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send();
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



// const makeCell = (data) => {
//     //create a table data cell and add attributes (like a class for example)
// }


// //check Event Delegation documentation
// const table = document.getElementById("table"); //get element that is the table
// table.addEventListener('click', (event) => {
//     //handle event depending on what it got
//     let target = event.target;
//     //if it's an update button, send a PUT request to the server
//     //if it's a delete button, send a DELETE request to the server
// });

// const onUpdate = () {
//     //send update request to server

//     //delete table
//     //make table again
// }

// const onDelete = () {
//     //send delete request to server

//     //delete table
//     //make table again
// }