import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Render,
  Res,
} from '@nestjs/common';
import { MpPaymentsService } from './mp-payments.service';
import { Response } from 'express';
import { FindOneDto, QueryParamsDto } from './dto/index';
import { html_narrow } from './helpers/helpers';
import { stringify } from 'querystring';

@Controller('mp')
export class MpPaymentsController {
  constructor(private readonly mpPaymentsService: MpPaymentsService) {}

  @Get('login')
  @Render('login')
  async loginPage() {
    return {
      title: 'Login Page',
    };
  }

  @Get('/')
  @Render('main')
  async mainPage() {
    const queryParams = { begin_date: 'NOW-3MONTHS', end_date: 'NOW' };
    const data = await this.mpPaymentsService.findAllNarrow(queryParams);
    return {
      title: 'Main Page',
      data: JSON.stringify(data),
    };
  }

  @Get('search')
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.mpPaymentsService.findAll(queryParams);
  }

  @Get('search-narrow')
  async findAllNarrow(
    @Res() res: Response,
    @Query() queryParams: QueryParamsDto,
  ) {
    const data = await this.mpPaymentsService.findAllNarrow(queryParams);
    const data2 = await this.mpPaymentsService.findAll(queryParams);

    res.send(html_narrow(data, data2));
    //return this.mpPaymentsService.findAllNarrow(queryParams);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: FindOneDto) {
    return this.mpPaymentsService.findOne(id);
  }
}
