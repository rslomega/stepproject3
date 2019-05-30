'use strict';
let urlAdd = 'http://localhost:3000/add';

let textarea = document.getElementById("textNote");
let btn = document.getElementById("btn");

btn.addEventListener( "click", addUser);



function addUser(){
    axios.get(urlAdd)
.then(function (response) {
    console.log(response);
    response.data.forEach(function(item){
        let row = '<tr data-id="' + item._id + '"><td>' + item.name + '</td>' +
                  '<td><button>Edit</button></td>' +
                  '<td><button onclick="deleteUser(\'' + item._id + '\')">Delete</button></td></tr>';
        
        userTable.innerHTML += row;
    });
})
.catch(function (error) {
    // handle error
    console.log(error);
})
.then(function () {
    // always executed
});
}










