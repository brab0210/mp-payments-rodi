import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
import { join } from 'path';

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
      queryParams: {
        begin_date,
        end_date,
        orderOnlyApproved: 'true',
        orderDate: 'money_release_date',
      },
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('search')
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.mpPaymentsService.findAll(queryParams);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('search-narrow')
  @Render('main')
  async findAllNarrow(@Query() queryParams: QueryParamsDto) {
    const data = await this.mpPaymentsService.findAllNarrow(queryParams);
    const data2 = await this.mpPaymentsService.aperturaDeImpuestos(queryParams);
    let begin_date = queryParams.begin_date.split('T')[0];
    let end_date = queryParams.end_date.split('T')[0];
    let orderDate = queryParams.orderDate;
    let orderOnlyApproved = queryParams.orderOnlyApproved;

    return {
      title: 'Main Page',
      data: JSON.stringify(data).replace("'", ''),
      data2: JSON.stringify(data2).replace("'", ''),
      queryParams: {
        begin_date,
        end_date,
        orderOnlyApproved,
        orderDate,
      },
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('old')
  @UsePipes(DatePipe)
  async oldNarrow(@Res() res: Response, @Query() queryParams) {
    const data = await this.mpPaymentsService.findAllNarrow(queryParams);
    const data2 = await this.mpPaymentsService.aperturaDeImpuestos(queryParams);
    const data3 = await this.mpPaymentsService.findAll(queryParams);
    let begin_date = queryParams.begin_date.split('T')[0];
    let end_date = queryParams.end_date.split('T')[0];
    queryParams = {
      begin_date,
      end_date,
      orderOnlyApproved: 'true',
      orderDate: 'money_release_date',
    };
    res.send(html_narrow(data, data2, data3, queryParams));
  }

  @UseGuards(AuthenticatedGuard)
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
    let orderDate = queryParams.orderDate;
    queryParams = {
      begin_date,
      end_date,
      orderOnlyApproved,
      orderDate,
    };

    //date_approved sin null
    if (orderOnlyApproved == 'true' && orderDate != 'date_last_updated') {
      const dato = await this.mpPaymentsService.oldDataNullFilter(
        reducida,
        apertura,
        original,
      );
      return res.send(
        html_narrow(dato.reducida, dato.apertura, dato.original, queryParams),
      );
    }
    if (orderDate == 'date_last_updated') {
      const dato = await this.mpPaymentsService.oldDataRefundFilter(
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

  @Post('/downloadreducida')
  async excelDownloadReducida(@Body() body: any, @Res() res: Response) {
    let { data, params } = body;

    await this.mpPaymentsService.excelReducida(data);

    const filepath = join(__dirname, '..', '..', 'resultadoReducida.xlsx');
    let leyendaExcel = await this.mpPaymentsService.leyendaExcel(params);
    let fileName = `${leyendaExcel}-Tabla_Reducida.xlsx`;

    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.download(filepath, fileName, (err) => {
      if (err) {
        console.error('Error al enviar el archivo');
        res.status(500).send('error al descargar archivo');
      } else {
        console.log('archivo enviado correctamente');
      }
    });
  }

  @Post('/downloadapertura')
  async excelDownloadApertura(@Body() body: any, @Res() res: Response) {
    let { data, params } = body;

    await this.mpPaymentsService.excelApertura(data);

    const filepath = join(__dirname, '..', '..', 'resultadoApertura.xlsx');
    let leyendaExcel = await this.mpPaymentsService.leyendaExcel(params);
    let fileName = `${leyendaExcel}-Tabla_Apertura.xlsx`;

    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.download(filepath, fileName, (err) => {
      if (err) {
        console.error('Error al enviar el archivo');
        res.status(500).send('error al descargar archivo');
      } else {
        console.log('archivo enviado correctamente');
      }
    });
  }

  @Post('/download')
  async testExtracto(@Body() body: any, @Res() res: Response) {
    let { data, params } = body;
    await this.mpPaymentsService.excelExtracto(data, params.orderDate);

    const filepath = join(__dirname, '..', '..', 'resultadoExtracto.xlsx');
    let leyendaExcel = await this.mpPaymentsService.leyendaExcel(params);
    let fileName = `${leyendaExcel}-Tabla_Extracto.xlsx`;

    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.download(filepath, fileName, (err) => {
      if (err) {
        console.error('Error al enviar el archivo');
        res.status(500).send('error al descargar archivo');
      } else {
        console.log('archivo enviado correctamente');
      }
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
