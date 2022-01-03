import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CoinService } from './coin.service';

let adminCount = 0;
@WebSocketGateway({ TransformStream: ['websocket'] })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly coinService: CoinService) {}
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    console.log('1',client.id);
    console.log('2',payload);
    console.log('3', payload);
    // const jsonString = JSON.stringify(payload);
    // const jsonParse = JSON.parse(payload);
    // console.log('4',jsonParse.email);
    adminCount++;
    if (adminCount == 1) {
      setInterval(async () => {
        this.server.emit('msgToClient', await this.coinService.broadcastData());
      }, 5000);
    }
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client 연결됨 : ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client 연결끊김 : ${client.id}`);
  }
}
