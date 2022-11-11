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
// import { NotifDto } from 'src/dto/notification.dto';

// @WebSocketGateway()
@WebSocketGateway({cors:true})
export class SocketGateway
  implements 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('CENTER_SEND')//RECEIVE FROM CENTER COMMAND
  handleFromCenterCommand(@MessageBody() notif:NotifDto ){
        console.log(notif.destination,"---DDD---");
        this.server.emit(`${notif.destination}_RECEIVE`,notif);//SEND TO RECEIVER
  }

  @SubscribeMessage('PHARMACY_1_SEND')//RECEIVE FROM PHARMACY CMS
  handleFromPharmacy1(@MessageBody() notif:NotifDto ){
        console.log(notif.destination,"---DDD---");
        this.server.emit(`${notif.destination}_RECEIVE`,notif);
  }

  @SubscribeMessage('POLY_1_SEND')//RECEIVE FROM POLY CMS
  handleFromPoly1(@MessageBody() notif:NotifDto ){
        console.log(notif.destination,"---DDD---");
        this.server.emit(`${notif.destination}_RECEIVE`,notif);
  }

  @SubscribeMessage('ER_1_SEND')//RECEIVE FROM ER CMS
  handleFromEr1(@MessageBody() notif:NotifDto ){
        console.log(notif.destination,"---DDD---");
        this.server.emit(`${notif.destination}_RECEIVE`,notif);
  }
  @SubscribeMessage('PHARMACY_2_SEND')//RECEIVE FROM PHARMACY CMS
  handleFromPharmacy2(@MessageBody() notif:NotifDto ){
        console.log(notif.destination,"---DDD---");
        this.server.emit(`${notif.destination}_RECEIVE`,notif);
  }

  @SubscribeMessage('POLY_2_SEND')//RECEIVE FROM POLY CMS
  handleFromPoly2(@MessageBody() notif:NotifDto ){
        console.log(notif.destination,"---DDD---");
        this.server.emit(`${notif.destination}_RECEIVE`,notif);
  }

  @SubscribeMessage('ER_2_SEND')//RECEIVE FROM ER CMS
  handleFromEr2(@MessageBody() notif:NotifDto ){
        console.log(notif.destination,"---DDD---");
        this.server.emit(`${notif.destination}_RECEIVE`,notif);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('User connected');
  }

  handleDisconnect(client: any) {
    console.log('User disconnected');
  }

  afterInit(server: any) {
    console.log('Socket is live');
  }
}
