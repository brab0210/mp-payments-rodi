import { Module } from '@nestjs/common';
import { MpPaymentsService } from './mp-payments.service';
import { MpPaymentsController } from './mp-payments.controller';
import { ConfigModule } from '@nestjs/config';
import { FetchApi } from './helpers/fetchApi';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [MpPaymentsController],
  providers: [MpPaymentsService, FetchApi],
  exports: [MpPaymentsService],
})
export class MpPaymentsModule {}
