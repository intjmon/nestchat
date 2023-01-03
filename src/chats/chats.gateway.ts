import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

// gateway로 소켓프로그램을 만들어서 사용할 수 있음
@WebSocketGateway()
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
