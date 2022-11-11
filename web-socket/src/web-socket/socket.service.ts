/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotifDto } from './notif.dto';

@Injectable()
export class SocketService {
  constructor(private readonly prisma: PrismaService) {}
  async postNotif(notif: NotifDto) {
    try {
      const newnotif = await this.prisma.notif.create({ data: notif });
      if (newnotif) {
        return { status: 201, message: 'data creted successfully !!!' };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: 400,
          error: 'CONFLICT ERROR, FAILED TO CREATE PRODUCT',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
