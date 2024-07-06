import { Injectable } from '@nestjs/common';
import { FetchApi } from './helpers/fetchApi';
import { FindOneDto, QueryParamsDto } from './dto';
import { funcAperturaImpuestos, miniNarrowResults } from './helpers/helpers';
import * as XLSX from 'xlsx';

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

  async filterData(dato, dato2, dato3) {
    let data = dato.results.filter((e) => e.date_approved != null);
    let data2 = dato2.resultados.filter((e) => e.date_approved != null);
    let data3 = dato3.results.filter((e) => e.date_approved != null);

    return { data, data2, data3 };
  }

  async testExcel(data) {
    const resultsSheet = [];
    data.resultados.forEach((result) => {
      const baseData = {
        id: result.id,
        date_approved: result.date_approved,
        description: result.description,
        net_received_amount: result.net_received_amount,
        total_paid_amount: result.total_paid_amount,
      };
      resultsSheet.push(baseData);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(resultsSheet);
    XLSX.utils.book_append_sheet(wb, ws, 'Results');
    XLSX.writeFile(wb, 'resultados2.xlsx');
  }
}
