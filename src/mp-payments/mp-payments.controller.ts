import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Render,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { MpPaymentsService } from './mp-payments.service';
import { Response } from 'express';
import { FindOneDto, QueryParamsDto } from './dto/index';
import { html_narrow } from './helpers/helpers';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { DatePipe } from './helpers/date.pipe';
import * as XLSX from 'xlsx';
import { createReadStream } from 'fs';

@Controller('mp')
export class MpPaymentsController {
  constructor(private readonly mpPaymentsService: MpPaymentsService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/')
  @UsePipes(DatePipe)
  @Render('main')
  async mainPage(@Query() queryParams) {
    const data = await this.mpPaymentsService.findAllNarrow(queryParams);
    const data2 = await this.mpPaymentsService.aperturaDeImpuestos(queryParams);
    let begin_date = queryParams.begin_date.split('T')[0];
    let end_date = queryParams.end_date.split('T')[0];

    return {
      title: 'Main Page',
      data: JSON.stringify(data).replace("'", ''),
      data2: JSON.stringify(data2).replace("'", ''),
      queryParams: { begin_date, end_date, order_only_approved: 'true' },
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('search')
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.mpPaymentsService.findAll(queryParams);
  }

  //@UseGuards(AuthenticatedGuard)
  @Get('search-narrow')
  @Render('main')
  async findAllNarrow(@Query() queryParams: QueryParamsDto) {
    const data = await this.mpPaymentsService.findAllNarrow(queryParams);
    const data2 = await this.mpPaymentsService.aperturaDeImpuestos(queryParams);
    let begin_date = queryParams.begin_date.split('T')[0];
    let end_date = queryParams.end_date.split('T')[0];
    let date_money_release = queryParams.orderDateMoney;
    let order_only_approved = queryParams.orderOnlyApproved;
    return {
      title: 'Main Page',
      data: JSON.stringify(data).replace("'", ''),
      data2: JSON.stringify(data2).replace("'", ''),
      queryParams: {
        begin_date,
        end_date,
        date_money_release,
        order_only_approved,
      },
    };
  }

  //@UseGuards(AuthenticatedGuard)
  @Get('old')
  @UsePipes(DatePipe)
  async oldNarrow(@Res() res: Response, @Query() queryParams) {
    const data = await this.mpPaymentsService.findAllNarrow(queryParams);
    const data2 = await this.mpPaymentsService.aperturaDeImpuestos(queryParams);
    const data3 = await this.mpPaymentsService.findAll(queryParams);
    let begin_date = queryParams.begin_date.split('T')[0];
    let end_date = queryParams.end_date.split('T')[0];
    queryParams = { begin_date, end_date, orderOnlyApproved: 'true' };
    res.send(html_narrow(data, data2, data3, queryParams));
  }

  @Get('old-narrow')
  async oldNarrowQuery(
    @Res() res: Response,
    @Query() queryParams: QueryParamsDto,
  ) {
    let reducida = await this.mpPaymentsService.findAllNarrow(queryParams);
    let apertura =
      await this.mpPaymentsService.aperturaDeImpuestos(queryParams);
    let original = await this.mpPaymentsService.findAll(queryParams);
    let begin_date = queryParams.begin_date.split('T')[0];
    let end_date = queryParams.end_date.split('T')[0];
    let orderOnlyApproved = queryParams.orderOnlyApproved;
    let orderDateMoney = queryParams.orderDateMoney;
    queryParams = { begin_date, end_date, orderOnlyApproved, orderDateMoney };

    //date_approved sin null
    if (orderOnlyApproved == 'true') {
      const dato = await this.mpPaymentsService.oldDataNullFilter(
        reducida,
        apertura,
        original,
      );
      return res.send(
        html_narrow(dato.reducida, dato.apertura, dato.original, queryParams),
      );
    }

    return res.send(html_narrow(reducida, apertura, original, queryParams));
  }

  @Get('/download')
  async excelDownload(@Query() queryParams, @Res() res: Response) {
    queryParams = {
      begin_date: '2024-05-01T00:00:00.000-04:00',
      end_date: '2024-07-31T23:59:59.000-04:00',
    };
    let data = await this.mpPaymentsService.aperturaDeImpuestos(queryParams);
    let datos = await this.mpPaymentsService.testExcel(data);

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=prueba.xlsx',
    });
  }

  @Get('/*')
  test(@Res() res: Response) {
    return res.redirect('/error404');
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: FindOneDto) {
    return this.mpPaymentsService.findOne(id);
  }
}
