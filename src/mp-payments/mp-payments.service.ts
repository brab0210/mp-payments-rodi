import { Injectable } from '@nestjs/common';
import { FetchApi } from './helpers/fetchApi';
import { FindOneDto, QueryParamsDto } from './dto';
import { funcAperturaImpuestos, miniNarrowResults } from './helpers/helpers';

@Injectable()
export class MpPaymentsService {
  constructor(private readonly fetchApi: FetchApi) {}

  async findAll(queryParams: QueryParamsDto) {
    const { results, paging } = await this.fetchApi.findAll(queryParams);
    return { results, paging };
  }

  async findOne(id: FindOneDto) {
    const res = await this.fetchApi.findOne(id);
    return res;
  }

  async findAllNarrow(queryParams: QueryParamsDto) {
    const res = await this.findAll(queryParams);

    const miniJson = await miniNarrowResults(res);
    return miniJson;
  }

  async aperturaDeImpuestos(queryParams: QueryParamsDto) {
    const findAllNarrow = await this.findAllNarrow(queryParams);
    const res = await funcAperturaImpuestos(findAllNarrow);
    return res;
  }
}
