const socket = io('/'); // io() 는 index.hbs의 soceket.io.min.js에서 제공하는 함수

const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

function helloUser() {
  const username = prompt('what is your name?');
  socket.emit('new_user', username, (data) => {
    console.log(data);
  });
  socket.on('hello_user', data => {
    console.log(data);
  });
}
function init() {
  helloUser();
}
init();