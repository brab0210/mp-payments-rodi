import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MpPaymentsModule } from './mp-payments/mp-payments.module';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MpPaymentsModule,
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
