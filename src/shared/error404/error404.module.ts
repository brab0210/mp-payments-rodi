import { Module } from '@nestjs/common';
import { Error404Controller } from './error404.controller';

@Module({
  controllers: [Error404Controller]
})
export class Error404Module {}
