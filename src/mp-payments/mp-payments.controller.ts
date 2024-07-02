import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MpPaymentsService } from './mp-payments.service';
import { Response } from 'express';
import { FindOneDto, QueryParamsDto } from './dto/index';
import { html_narrow } from './helpers/helpers';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';

@Controller('mp')
export class MpPaymentsController {
  constructor(private readonly mpPaymentsService: MpPaymentsService) {}

  //@UseGuards(AuthenticatedGuard)
  @Get('/')
  @Render('main')
  async mainPage() {
    const queryParams = { begin_date: 'NOW-2MONTHS', end_date: 'NOW' };
    const data = await this.mpPaymentsService.findAllNarrow(queryParams);
    const data2 = await this.mpPaymentsService.aperturaDeImpuestos(queryParams);

    return {
      title: 'Main Page',
      data: JSON.stringify(data).replace("'", ''),
      data2: JSON.stringify(data).replace("'", ''),
      /*data3: JSON.stringify(data3), */
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('search')
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.mpPaymentsService.findAll(queryParams);
  }

  //  @UseGuards(AuthenticatedGuard)
  @Get('search-narrow')
  @Render('main')
  async findAllNarrow(@Query() queryParams: QueryParamsDto) {
    const data = await this.mpPaymentsService.findAllNarrow(queryParams);
    const data2 = await this.mpPaymentsService.aperturaDeImpuestos(queryParams);

    return {
      title: 'Main Page',
      data: JSON.stringify(data).replace("'", ''),
      data2: JSON.stringify(data).replace("'", ''),
    };
  }

  @Get('old')
  async oldNarrow(@Res() res: Response, @Query() queryParams: QueryParamsDto) {
    if (!queryParams[0]) {
      const queryParams = { begin_date: 'NOW-1MONTHS', end_date: 'NOW' };
    }
    const data = await this.mpPaymentsService.findAllNarrow(queryParams);
    const data2 = await this.mpPaymentsService.aperturaDeImpuestos(queryParams);
    const data3 = await this.mpPaymentsService.findAll(queryParams);
    res.send(html_narrow(data, data2, data3));
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: FindOneDto) {
    return this.mpPaymentsService.findOne(id);
  }

  @Get('/*')
  test(@Res() res: Response) {
    return res.redirect('/mp/login');
  }
}
