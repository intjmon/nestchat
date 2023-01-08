import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

// websocket의 네임스페이스
// gateway로 소켓프로그램을 만들어서 사용할 수 있음
//@WebSocketGateway() // 웹소캣의 네이스페이스가 없는 경우
@WebSocketGateway({ namespace: 'chattings' }) // 웹소캣의 네임스페이스가 있는 경우
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('FS_CHATTINGS');

  constructor() {
    this.logger.log('WebSocketGateway constructor');
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(
      `disconnect -> sid:${socket.id}, ip:${socket.handshake.address}, namespace:${socket.nsp.name}`,
    );
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(
      `WebSocketGateway connect -> sid:${socket.id}, ip:${socket.handshake.address}, namespace:${socket.nsp.name}`,
    );
  }

  afterInit() {
    this.logger.log('WebSocketGateway AfterInit');
  }

  @SubscribeMessage('new_user') // new_user라는 이벤트를 받으면 handleNewUser 함수를 실행
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(socket.id);
    console.log(username);
    //   socket.broadcast.emit('user_connected : ',  username);
    return username;
  }
}
