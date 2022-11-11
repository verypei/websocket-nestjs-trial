/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller , Post, Req} from '@nestjs/common';
import { Request } from 'express';
import {SocketService } from "./socket.service"

@Controller()

export class SocketController {
    constructor(private readonly socket: SocketService){}
    @Post('handle')
    async handle(@Req() req:Request){
        console.log(req.body,"---req. body---");
        try {
            return await this.socket.postNotif(req.body)
        } catch (error) {
            return error;
        }
    }
}
