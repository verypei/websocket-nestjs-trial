/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotifDto } from './notif.dto';

@WebSocketGateway({cors:true})
export class SocketGateway
  implements 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('pusat')
  async handleAnother(@MessageBody() notif:NotifDto ){
    this.server.emit('pusat',notif);
  }

  @SubscribeMessage('from_client_2')
  async handleAnother2(@MessageBody() data: string){
    this.server.emit('from_client_2',data)
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('User connected');
  }

  handleDisconnect(client: any) {
    console.log('User disconnected');
    // console.log(client,"===");
  }

  afterInit(server: any) {
    console.log('Socket is live');
  }
}
