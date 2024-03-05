const socket = io();//other link here server link
const totalUsers = document.getElementById('usertotal');
const totalUsers2 = document.getElementById('usertotal2');

const msgContainer = document.getElementById('message-container')
const userName = document.getElementById('input-name')
const msgform = document.getElementById('message-form')
const msgInput = document.getElementById('message-input')


msgform.addEventListener('submit', (e) =>{
    e.preventDefault()
    sendMsg()
   })


socket.on('total-user', (data)=>{
    totalUsers.innerHTML=`Total Users: <b>${data}</b>`;
    totalUsers2.innerHTML=`Total Users: <b>${data}</b>`;
   
});




function sendMsg(){
    console.log(msgInput.value)
}

