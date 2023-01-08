//const socket = io('/'); // io() 는 index.hbs의 soceket.io.min.js에서 제공하는 함수
// 루트 / 는 채팅방의 네임스페이스
// 테임스페이스가 여러개로 만들수있고
// 설정하면 버서에서도 WebSocketGateway에서 namespace를 설정해줘야한다.
const socket = io('/chattings'); // io() 는 index.hbs의 soceket.io.min.js에서 제공하는 함수

const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

// 
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} :)`);


function helloUser() {
  const username = prompt('what is your name?');
  socket.emit('new_user', username, (data) => { // new_user 이벤트를 발생시키고 서버로 데이터를 전송
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
}

init();