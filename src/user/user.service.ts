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
    if (this.user.name === username) {
      let _password = this.hashPassword(this.user.password);
      return {
        name: username,
        password: _password,
      };
    }
  }

  private hashPassword(pass: string): string {
    let hashPassword = bcrypt.hashSync(pass, 10);
    return hashPassword;
  }
}
