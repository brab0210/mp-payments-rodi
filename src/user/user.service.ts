import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

export interface User {
  name: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(private readonly configService: ConfigService) {}

  private readonly user: User = {
    name: this.configService.get<string>('USER'),
    password: this.configService.get<string>('PASSWORD'),
  };

  async findOne(username: string): Promise<User | undefined> {
    console.log({ userService: this.user });
    this.user.password = bcrypt.hashSync(this.user.password, 10);
    if (this.user.name === username) return this.user;
  }
}
