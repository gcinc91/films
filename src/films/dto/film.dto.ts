import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FilmDto {

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  cartel: string;

  @ApiProperty({ enum: ['Terror', 'Drama', 'Comedia', 'Acción'] })
  gender: string;

}

export class pageDTO {
  @ApiPropertyOptional()
  page: number;
}

export class UpdateFilmDTO extends FilmDto { }