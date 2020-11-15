import { ApiProperty } from '@nestjs/swagger';

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

export class UpdateFilmDTO extends FilmDto { }