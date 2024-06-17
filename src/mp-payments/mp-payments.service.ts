import { Injectable } from '@nestjs/common';
import { FetchApi } from './helpers/fetchApi';
import { FindOneDto, QueryParamsDto } from './dto';
import { narrowResults, miniNarrowResults } from './helpers/helpers';

@Injectable()
export class MpPaymentsService {
  constructor(private readonly fetchApi: FetchApi) {}

  async findAll(queryParams: QueryParamsDto) {
    const res = await this.fetchApi.findAll(queryParams);
    const resNarrow = await narrowResults(res);
    return resNarrow;
  }

  async findOne(id: FindOneDto) {
    const res = await this.fetchApi.findOne(id);
    return this.fetchApi.findOne(id);
  }

  async findAllNarrow(queryParams: QueryParamsDto) {
    const res = await this.fetchApi.findAll(queryParams);
    const resNarrow = await narrowResults(res);
    const miniResNarrow = await miniNarrowResults(resNarrow);
    return miniResNarrow;
  }
}
