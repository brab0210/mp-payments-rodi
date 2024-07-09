import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express';
@Controller('error404')
export class Error404Controller {
  @Get('/')
  @Render('error404')
  getError(@Req() req: Request) {
    let userExist = false;
    if (req.rawHeaders.find((e) => e.match('rodiSe'))) {
      userExist = true;
    }

    return {
      userExist,
    };
  }
}
