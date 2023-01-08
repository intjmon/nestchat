//const socket = io('/'); // io() 는 index.hbs의 soceket.io.min.js에서 제공하는 함수
// 루트 / 는 채팅방의 네임스페이스
// 테임스페이스가 여러개로 만들수있고
// 설정하면 버서에서도 WebSocketGateway에서 namespace를 설정해줘야한다.
const socket = io('/chattings'); // io() 는 index.hbs의 soceket.io.min.js에서 제공하는 함수

const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

const handleSubmit = (event) => {
  event.preventDefault(); // 폼에서 submit 이벤트가 발생하면 새로고침이 되는데 이를 막아준다.
  //console.log('helloworld');
  const inputValue = event.target.elements[0].value; // formElement[0]은 input 태그를 의미
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue); // send_msg 이벤트를 발생시키고 서버로 데이터를 전송
    drawChatting(`me: ${inputValue}`);
    event.target.elements[0].value = '';
  }
};

socket.on('new_chat', (msg) => { // user_connected 이벤트를 받으면 실행
  //  console.log(`${username} is connected`);
  console.log('msg:', msg);
  if (msg.chat !== '') {
    drawChatting(`[${msg.username}: ${msg.chat}]`);
  }
});

socket.on('user_connected', (username) => { // user_connected 이벤트를 받으면 실행
  console.log(`${username} is connected`);
});
// 화며에 그려주기 함수
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} :)`);

const drawChatting = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = ` <div> ${message} </div>`;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};


function helloUser() {
  const username = prompt('what is your name?');
  socket.emit('new_user', username, (data) => { // new_user 이벤트를 발생시키고 서버로 데이터를 전송
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
}

init();