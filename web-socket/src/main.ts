import { NestFactory } from '@nestjs/core';
import { Http2ServerRequest } from 'http2';
import { AppModule } from './app.module';
const { instrument } = require("@socket.io/admin-ui");
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin:"*"})
  await app.listen(3334,()=>{
    console.log("<<<<<<<<======== LISTENING ON PORT 7000 WEB SOCKET TRIAL =======>>>>>>>>");
  });

  const io = new Server(httpServer, {
    cors: {
      origin: ["https://admin.socket.io"],
      credentials: true
    }
  });

  instrument(io, {
    auth: false,
  });
}
bootstrap();
