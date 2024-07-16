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
        orderDateCreated: 'false',
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
    let orderDateCreated = queryParams.orderDateCreated;
    let orderOnlyApproved = queryParams.orderOnlyApproved;

    return {
      title: 'Main Page',
      data: JSON.stringify(data).replace("'", ''),
      data2: JSON.stringify(data2).replace("'", ''),
      queryParams: {
        begin_date,
        end_date,
        orderOnlyApproved,
        orderDateCreated,
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
      orderDateCreated: 'false',
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
    let orderDateCreated = queryParams.orderDateCreated;
    queryParams = {
      begin_date,
      end_date,
      orderOnlyApproved,
      orderDateCreated,
    };

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
    let data = await this.mpPaymentsService.aperturaDeImpuestos(queryParams);
    let datos = await this.mpPaymentsService.excelApertura(data);
    const filepath = join(__dirname, '..', '..', 'resultadoApertura.xlsx');

    let leyendaExcel = await this.mpPaymentsService.leyendaExcel(queryParams);

    res.download(filepath, `${leyendaExcel}-Tabla_Apertura.xlsx`);
  }

  @Get('/downloadredu')
  async excelDownloadReducida(@Query() queryParams, @Res() res: Response) {
    let data = await this.mpPaymentsService.findAllNarrow(queryParams);

    let datos = await this.mpPaymentsService.excelReducida(data);
    const filepath = join(__dirname, '..', '..', 'resultadoReducida.xlsx');
    let leyendaExcel = await this.mpPaymentsService.leyendaExcel(queryParams);

    res.download(filepath, `${leyendaExcel}-Tabla_Reducida.xlsx`);
  }

  /* @Get('/downloadextracto')
  async excelExtracto(@Query() queryParams, @Res() res: Response) {
    let data = await this.mpPaymentsService.aperturaDeImpuestos(queryParams);
    let datos = await this.mpPaymentsService.excelExtracto(data);
    const filepath = join(__dirname, '..', '..', 'resultadoExtracto.xlsx');

    let leyendaExcel = await this.mpPaymentsService.leyendaExcel(queryParams);

    res.download(filepath, `${leyendaExcel}-Tabla_Extracto.xlsx`);
  } */

  @Post('/downloadextracto')
  async testExtracto(@Body() body: any, @Res() res: Response) {
    let { data, params } = body;
    let datos;
    if (params.orderDateCreated == 'true') {
      let orderDateCreated = 'true';
      datos = await this.mpPaymentsService.excelExtracto(
        data,
        orderDateCreated,
      );
    } else {
      let orderDateCreated = 'false';
      datos = await this.mpPaymentsService.excelExtracto(
        data,
        orderDateCreated,
      );
    }
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
