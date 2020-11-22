import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


enum genereEnum {
  NOT_USED = 0,
  TERROR = 1,
  DRAMA = 2,
  COMEDIA = 3,
  ACCION = 4,
  SUSPENSE = 5,
  AVENTURA = 6,
}

export const ValidGenereTypes = Object.keys(genereEnum)
  .filter(key => isNaN(parseInt(key, 10))).slice(1);
export class FilmDto {

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  cartel: string;

  @ApiProperty({ enum: [...ValidGenereTypes] })
  gender: string;

}

export class PageDTO {
  @ApiPropertyOptional()
  page: number;
}

export class FilterDTO {
  @ApiPropertyOptional({ enum: [...ValidGenereTypes] })
  filter: string[];
}


export class UpdateFilmDTO extends FilmDto { }