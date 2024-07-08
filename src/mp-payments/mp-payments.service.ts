import { Injectable } from '@nestjs/common';
import { FetchApi } from './helpers/fetchApi';
import { FindOneDto, QueryParamsDto } from './dto';
import { funcAperturaImpuestos, miniNarrowResults } from './helpers/helpers';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

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

  async oldDataNullFilter(...args) {
    const reducida = await args[0].results.filter(
      (e) => e.date_approved != null,
    );
    const apertura = await args[1].resultados.filter(
      (e) => e.date_approved != null,
    );
    const original = await args[2].results.filter(
      (e) => e.date_approved != null,
    );
    return { reducida, apertura, original };
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
    //const result = await XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
    /*  XLSX.writeFileXLSX(wb,"resultados.xlsx").then((data)=>{
      fs.writeFile('archivo',)
    }) */

    //return result;
  }
}
