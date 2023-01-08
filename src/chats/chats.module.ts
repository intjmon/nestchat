import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chatting, ChattingSchama } from './models/chattings.model';
import { SocketSchema, Socket as SocketModel } from './models/sockets.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatting.name, schema: ChattingSchama },
      // SocketModel이라고 한 이유는 Socket.io에서 Socket이라는
      // 이름을 사용하기 때문에 혼란을 피하기위함
      { name: SocketModel.name, schema: SocketSchema },
    ]),
  ],
  providers: [ChatsGateway],
})
export class ChatsModule {}
