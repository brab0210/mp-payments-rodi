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
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('login')
  async loginPage(@Res() res: Response, @Req() req: Request) {
    if (req.rawHeaders.find((e) => e.match('rodiSe'))) {
      return res.redirect('/mp');
    }
    res.render('login', { title: 'Login Page' });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async mainPage(@Res() res: Response, @Req() req: Request) {
    res.redirect('/mp');
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.authService.logout(req, res);
  }
}
