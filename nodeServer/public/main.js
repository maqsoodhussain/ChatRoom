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
   if(data === 3){
    
        confirm("3Rd person added knows ");
    }
   
});




function sendMsg(){
    console.log(msgInput.value);
    const data = {
        name : userName.value,
        message : msgInput.value,
        dataTime : new Date(),
    }
    socket.emit('msg',data)
    addMsg(true, data)
    msgInput.value = ''
}

socket.on('chat-msg', (data) =>{
    console.log(data);
    addMsg(false, data)
})

function  addMsg(isOwnMsg, data){

    const ele= `<li class="${isOwnMsg ? "message-right" : "message-right"}">
    <p class="message">
        ${data.message}
      <span>${data.name} 🔹 ${moment(data.dateTime).fromNow()}</span>
    </p>
</li>`

msgContainer.innerHTML += ele;

}
