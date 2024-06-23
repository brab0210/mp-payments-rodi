import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MpPaymentsService } from './mp-payments.service';
import { Response } from 'express';
import { FindOneDto, QueryParamsDto } from './dto/index';
import { html_narrow } from './helpers/helpers';

import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';

@Controller('mp')
export class MpPaymentsController {
  constructor(private readonly mpPaymentsService: MpPaymentsService) {}

  @UseGuards(AuthenticatedGuard)
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

  @UseGuards(AuthenticatedGuard)
  @Get('search')
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.mpPaymentsService.findAll(queryParams);
  }

  @UseGuards(AuthenticatedGuard)
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
