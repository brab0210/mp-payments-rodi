import { Controller, Get, Post, Render, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MpPaymentsService } from 'src/mp-payments/mp-payments.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly mpPaymentsService: MpPaymentsService) {}

  @Get('login')
  @Render('login')
  async loginPage() {
    return {
      title: 'Login Page',
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  @Render('main')
  async mainPage() {
    const queryParams = { begin_date: 'NOW-3MONTHS', end_date: 'NOW' };
    const data = await this.mpPaymentsService.findAllNarrow(queryParams);
    return {
      title: 'Main Page',
      data: JSON.stringify(data),
    };
  }
}
