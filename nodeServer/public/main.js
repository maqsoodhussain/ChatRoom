const socket = io();//other link here server link
const totalUsers = document.getElementById('usertotal');
const totalUsers2 = document.getElementById('usertotal2');
socket.on('total-user', (data)=>{
    totalUsers.innerHTML=`Total Users: <b>${data}</b>`;
    totalUsers2.innerHTML=`Total Users: <b>${data}</b>`;
});

