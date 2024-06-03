import { Type } from 'class-transformer';

export class FindOneDto {
  @Type(() => Number)
  id: number;
}
