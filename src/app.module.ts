import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MpPaymentsModule } from './mp-payments/mp-payments.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(), MpPaymentsModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
