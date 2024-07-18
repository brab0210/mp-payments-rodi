import { BadRequestException, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Result } from '../interfaces/data.interface';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { FindOneDto, QueryParamsDto } from '../dto';

@Injectable()
export class FetchApi {
  constructor(
    private readonly configServices: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  private readonly url = this.configServices.get<string>('API_URL');
  private readonly token = this.configServices.get<string>('ACCESS_TOKEN');
  private readonly tokenBuffer = Buffer.from(this.token, 'base64').toString(
    'ascii',
  );
  async findAll(queryParams: QueryParamsDto) {
    try {
      const {
        begin_date,
        end_date,
        orderDate = 'money_release_date',
      } = queryParams;
      const response = await firstValueFrom(
        this.httpService.get(`${this.url}search`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.tokenBuffer}`,
          },
          params: {
            sort: orderDate,
            criteria: 'desc',
            range: orderDate,
            begin_date,
            end_date,
            limit: 1000,
          },
        }),
      );
      //console.log({ response });
      return response.data;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findOne(id: FindOneDto): Promise<Result> {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      return response.json();
    } catch (error) {
      this.handleErrors(error);
    }
  }

  private handleErrors(error: any) {
    throw new BadRequestException(error.detail);
  }
}
