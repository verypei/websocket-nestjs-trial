/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SocketController],
  providers: [SocketService, SocketGateway],
  exports: [SocketService, SocketGateway],
  
})
export class SocketModule {}
