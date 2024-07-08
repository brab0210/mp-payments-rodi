import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MpPaymentsModule } from './mp-payments/mp-payments.module';
import { HttpModule } from '@nestjs/axios';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { RedirectMiddleware } from './shared/redirect.middleware';

import { Error404Module } from './shared/error404/error404.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MpPaymentsModule,
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveStaticOptions: { index: false },
    }),
    AuthModule,
    UserModule,
    Error404Module,
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RedirectMiddleware).forRoutes('/');
  }
}
