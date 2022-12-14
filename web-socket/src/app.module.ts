import { SocketModule } from './web-socket/socket.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SocketModule, 
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
