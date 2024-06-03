import { BadRequestException, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import {
  DataPayments,
  Result,
  ResultMP,
  ResultsMPObj,
} from '../interfaces/data.interface';

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

  async findAll(queryParams: QueryParamsDto) {
    try {
      const { begin_date, end_date } = queryParams;

      const response = await firstValueFrom(
        this.httpService.get(`${this.url}search`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          params: {
            sort: 'date_created',
            criteria: 'asc',
            range: 'date_created',
            begin_date,
            end_date,
          },
        }),
      );
      const resNarrow = this.narrowJson(response.data);
      return resNarrow;
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
  //
  private async narrowJson(response) {
    let responseArray = [];
    let responseObject = {};

    response['results'].forEach((res, index) => {
      const {
        id,
        date_approved,
        fee_details,
        transaction_details,
        description,
        charges_details,
      } = res;
      responseArray.push({
        nro: ++index,
        id,
        date_approved,
        fee_details,
        transaction_details,
        description,
        charges_details,
      });
    });

    responseObject['results'] = responseArray;
    responseObject['paging'] = response['paging'];
    return responseObject;
  }

  private handleErrors(error: any) {
    throw new BadRequestException(error.detail);
  }
}
