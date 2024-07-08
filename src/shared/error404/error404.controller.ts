import { Controller, Get, Render } from '@nestjs/common';

@Controller('error404')
export class Error404Controller {
  @Get('/')
  @Render('error404')
  getError() {
    return {};
  }
}
