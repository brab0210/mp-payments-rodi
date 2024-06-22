import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MpPaymentsModule } from './mp-payments/mp-payments.module';
import { HttpModule } from '@nestjs/axios';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MpPaymentsModule,
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule {}
