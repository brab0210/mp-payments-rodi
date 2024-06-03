import { Injectable } from '@nestjs/common';
import { FetchApi } from './helpers/fetchApi';
import { FindOneDto, QueryParamsDto } from './dto';
import * as XLSX from 'xlsx';
import { join, resolve } from 'path';

@Injectable()
export class MpPaymentsService {
  constructor(private readonly fetchApi: FetchApi) {}

  async findAll(queryParams: QueryParamsDto) {
    const res = await this.fetchApi.findAll(queryParams);
    this.generateExcel(res);

    return res;
  }

  async findOne(id: FindOneDto) {
    const res = await this.fetchApi.findOne(id);

    return this.fetchApi.findOne(id);
  }

  generateExcel(data) {
    const filePath = join(__dirname, 'files', 'data.xlsx');
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, filePath);
  }
}
