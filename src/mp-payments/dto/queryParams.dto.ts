import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class QueryParamsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  begin_date: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  end_date: string;

  @IsOptional()
  @IsString()
  orderDateCreated?: string;

  @IsOptional()
  @IsString()
  orderOnlyApproved?: string;
}
