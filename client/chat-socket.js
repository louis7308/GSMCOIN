const socket = io("http://192.168.0.21:3001")

const message = document.getElementById('message');
const messages = document.getElementById('messages');

const handleSubmitNewMessage = () => {
    socket.emit('msgToServer', { data: message.value })
}

socket.on('msgToClient', ({ data }) => {
    console.log(data);
    handleNewMessage(data);
})

const handleNewMessage = (message) => {
    messages.appendChild(buildNewMessage(message));
}

const buildNewMessage = (message) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(message))
    return li;
}