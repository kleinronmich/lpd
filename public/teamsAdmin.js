const baseURL = `https://flip2.engr.oregonstate.edu:5065`;
//const baseURL = `https://localhost:5064`;

document.addEventListener('DOMContentLoaded', (event) => {
var req = new XMLHttpRequest();
req.open("GET", baseURL + "/loadTeams", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400){
			console.log(JSON.parse(req.responseText));
		}
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});
	req.send();
	event.preventDefault();
});

// const makeTable = (allRows) => {
//     //Itereate over the rows
//         //add table data cells each with data
//         //add the buttons
// }

// const makeRow = (row) => {
//     //row would be an object with all the properties
//     //use data in row to create table data cells
//     //make the form that wraps the table data cells
//     //append each of the cells
// }

// const makeCell = (data) => {
//     //create a table data cell and add attributes (like a class for example)
// }

// const makeInput = (data) => {
//     //creates form input
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