//try
'use strict';
let urls = [
    'http://localhost:3000/add',
    'http://localhost:3000/add',
    'http://localhost:3000/add',
  ];


let textarea = document.getElementById("textNote");
let btn = document.getElementById("btn");

btn.addEventListener( "click", addUser);



function addUser(){
    Promise.all(
        urls.map(elem=>{
          return new Promise((resolve,reject)=>{
            axios.get(elem).then(result=>{resolve(result)}).catch(e=>{console.log('error')})
          })
        })
      ).then(res=>{console.log(res)}).catch(e=>{console.log('error')})
    console.log(textarea.value);
}


axios.get('http://localhost:3000/showUsers')
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