import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { MpPaymentsService } from '../mp-payments/mp-payments.service';
import { FetchApi } from 'src/mp-payments/helpers/fetchApi';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [UserModule, PassportModule, ConfigModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, MpPaymentsService, FetchApi],
})
export class AuthModule {}
