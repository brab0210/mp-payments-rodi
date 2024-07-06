import {
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { LocalAuthGuard } from './guards/local.auth.guard';

@Controller('auth')
export class AuthController {
  @Get('login')
  async loginPage(@Res() res: Response) {
    res.render('login', { title: 'Login Page' });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async mainPage(@Res() res: Response) {
    res.redirect('/mp/');
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<any> {
    req.session.destroy(() => {
      delete req.session;
      res.clearCookie('rodiSession');
      res.redirect('/');
    });
    /*  req.logOut(() => {
      res.clearCookie('rodiSession');
      res.redirect('/mp/');
    }); */
  }
}
