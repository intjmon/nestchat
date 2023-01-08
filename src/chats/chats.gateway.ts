import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
import { Chatting } from './models/chattings.model';
import { Socket as SocketModel } from './models/sockets.model';
import { Model } from 'mongoose';

// websocket의 네임스페이스
// gateway로 소켓프로그램을 만들어서 사용할 수 있음
//@WebSocketGateway() // 웹소캣의 네이스페이스가 없는 경우
@WebSocketGateway({ namespace: 'chattings' }) // 웹소캣의 네임스페이스가 있는 경우
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('FS_CHATTINGS');

  constructor(
    // gateway에서 사용할 모델을 주입
    @InjectModel(Chatting.name) private readonly chattingModel: Model<Chatting>,
    @InjectModel(SocketModel.name)
    private readonly socketModel: Model<SocketModel>,
  ) {
    this.logger.log('WebSocketGateway constructor');
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    const user = await this.socketModel.findOne({ id: socket.id });
    if (user) {
      socket.broadcast.emit('disconnect_user', user.username);
      await user.delete();
    }
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
  async handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const exist = await this.socketModel.exists({ username });
    if (exist) {
      username = `${username}_${Math.floor(Math.random() * 1000)}`;
      await this.socketModel.create({ id: socket.id, username });
    } else {
      await this.socketModel.create({ id: socket.id, username });
    }
    socket.broadcast.emit('user_connected', username); // 모든 사용자에게 브로드캐스팅
    return username;
  }

  @SubscribeMessage('submit_chat') // new_user라는 이벤트를 받으면 handleNewUser 함수를 실행
  async handleSubmitChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const socketObj = await this.socketModel.findOne({ id: socket.id });
    this.logger.log(`submit_chat -> ${socketObj}`);
    await this.chattingModel.create({
      user: socketObj,
      chat: chat,
    });
    socket.broadcast.emit('new_chat', {
      chat,
      username: socketObj.username,
    });
  }
}
