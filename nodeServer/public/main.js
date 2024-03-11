const socket = io();//other link here server link
const totalUsers = document.getElementById('usertotal');
const totalUsers2 = document.getElementById('usertotal2');

const msgContainer = document.getElementById('message-container')
const userName = document.getElementById('input-name')
const msgform = document.getElementById('message-form')
const msgInput = document.getElementById('message-input')
const fdb = document.getElementById('fdb')


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
    if(msgInput.value ==='') return 
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

    clrfdb()
    const ele= `<li class="${isOwnMsg ? "message-right" : "message-left"}">
    <p class="message">
        ${data.message}
      <span>${data.name} 🔹 ${moment(data.dateTime).fromNow()}</span>
    </p>
</li>`

msgContainer.innerHTML += ele;
scrollToBottom()

}


function scrollToBottom(){
    msgContainer.scrollTo(0,msgContainer.scrollHeight)
}

msgInput.addEventListener('focus', (e) =>{
   socket.emit('feedback', {
    feedback : `${userName.value} Typing...`,
   })
})

msgInput.addEventListener('keypress', (e)=>{
    socket.emit('feedback', {
        feedback : `${userName.value} Typing...`,
       })
})

msgInput.addEventListener('blur', (e)=>{
    socket.emit('feedback', {
        feedback : '',
       })
})

socket.on('feedback', (data)=>{
    clrfdb()
     const ele = `
     <p class="feedback" id="feedback">
       ${data.feedback}
     </p>`

     fdb.innerHTML +=ele
 
})

function clrfdb(){
    document.querySelectorAll('li.message-feedback').forEach(elemet =>{
        elemet.parentNode.removeChild(elemet)
    })
}