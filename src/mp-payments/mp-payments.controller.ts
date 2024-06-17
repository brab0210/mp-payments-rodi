import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { MpPaymentsService } from './mp-payments.service';
import { FindOneDto, QueryParamsDto } from './dto/index';

@Controller('mp')
export class MpPaymentsController {
  constructor(private readonly mpPaymentsService: MpPaymentsService) {}

  @Get('search')
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.mpPaymentsService.findAll(queryParams);
  }

  @Get('search-narrow')
  findAllNarrow(@Query() queryParams: QueryParamsDto) {
    return this.mpPaymentsService.findAllNarrow(queryParams);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: FindOneDto) {
    return this.mpPaymentsService.findOne(id);
  }
}
