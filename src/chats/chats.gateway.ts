import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

// gateway로 소켓프로그램을 만들어서 사용할 수 있음
@WebSocketGateway()
export class ChatsGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
