import { Injectable } from '@nestjs/common';
import { FetchApi } from './helpers/fetchApi';
import { FindOneDto, QueryParamsDto } from './dto';
import { funcAperturaImpuestos, miniNarrowResults } from './helpers/helpers';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { join } from 'path';

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

  async excelReducida(data) {
    const resultsSheet = [];
    data.results.forEach((result) => {
      const baseData = {
        ID: result.id,
        'Date Created': result.date_created.split(' ')[0],
        'Date Approved':
          result.date_approved == null
            ? ''
            : result.date_approved.split(' ')[0],
        'Money Release Date':
          result.money_release_date == null
            ? ''
            : result.money_release_date.split(' ')[0],
        'Payment Type ID': result.payment_type_id,
        CUIT: result.cuit,
        Description: result.description,
        'Fee Amount': +result.fee_amount,
        'Total Charges': +result.charges_details_total,
        'Net Received Amount': +result.net_received_amount,
        'Total Paid Amount': +result.total_paid_amount,
      };
      resultsSheet.push(baseData);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(resultsSheet);
    XLSX.utils.book_append_sheet(wb, ws, 'Tabla Reducida');
    await XLSX.writeFileXLSX(wb, 'resultadoReducida.xlsx');
    //return result;
  }

  async excelExtracto(data, orderDate) {
    const resultsSheet = [];
    data.forEach((result) => {
      let fecha;
      if (orderDate == 'true') {
        fecha = result.date_created;
      }
      if ((orderDate = 'false')) {
        fecha = result.money_release_date;
      }

      const baseData = {
        Fecha: fecha == null ? '' : fecha.split(' ')[0],
        Description: `${result.id} | ${result.description} | ${result.payer ? result.payer.identification?.number : ''}`,
        Importe: +result.net_received_amount,

        Saldo: '',
      };
      resultsSheet.push(baseData);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(resultsSheet);
    XLSX.utils.book_append_sheet(wb, ws, 'Extracto Bancario');
    await XLSX.writeFileXLSX(wb, 'resultadoExtracto.xlsx');
  }

  async leyendaExcel(queryParams) {
    let begin_date = queryParams.begin_date.split('T')[0];
    let end_date = queryParams.end_date.split('T')[0];

    let leyendaExcel = `${begin_date} al ${end_date}-orderDate_${queryParams.orderDate}-orderOnlyApproved_${queryParams.orderOnlyApproved}`;

    return leyendaExcel;
  }

  async filtrosExtractoBancarios(data, queryParams) {
    //console.log({ body: data });
  }
}
