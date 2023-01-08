import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

// websocket의 네임스페이스
// gateway로 소켓프로그램을 만들어서 사용할 수 있음
//@WebSocketGateway() // 웹소캣의 네이스페이스가 없는 경우
@WebSocketGateway({ namespace: 'linuxlinux' }) // 웹소캣의 네임스페이스가 있는 경우
export class ChatsGateway {
  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(socket.id);
    console.log(username);
    socket.emit('hello_user', 'hello ' + username);
    return 'hello world';
  }
}
