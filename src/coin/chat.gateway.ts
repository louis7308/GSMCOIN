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
import { CoinService } from './coin.service'

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly coinService: CoinService) {}
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('ChatGateway')

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    console.log(client.id);
    console.log(payload);
    setInterval(() => {
      console.log(this.coinService.test())
      this.server.emit('msgToClient', this.coinService.test());

    }, 5000)
  }

  afterInit(server: Server) {
      this.logger.log('Init');
  }

  handleConnection(client: Socket) {
      this.logger.log(`Client 연결됨 : ${client.id}`);
  }

  handleDisconnect(client: Socket) {
      this.logger.log(`Client 연결끊김 : ${client.id}`)
  }
}
