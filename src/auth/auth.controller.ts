import {
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { MpPaymentsService } from 'src/mp-payments/mp-payments.service';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly mpPaymentsService: MpPaymentsService,
    private readonly authService: AuthService,
  ) {}

  @Get('login')
  @Render('login')
  async loginPage() {
    return {
      title: 'Login Page',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async mainPage(@Res() res: Response) {
    res.redirect('/mp/');
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<any> {
    req.session.destroy(() => {
      res.clearCookie('rodiSession');
      res.redirect('login');
    });
    //res.cookie('rodiSession', null, { maxAge: -1 });
  }
}
