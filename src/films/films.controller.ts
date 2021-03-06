import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilmsService } from './films.service';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilmDto, FilterDTO, PageDTO, UpdateFilmDTO, ValidGenereTypes } from './dto/film.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFile } from 'lib/customDecorator';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards';


@Controller('film')
@ApiTags('Peliculas')
export class FilmsController {
  constructor(public filmsService: FilmsService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() film: FilmDto,
  ) {
    return this.filmsService.create(film)
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    isArray: true,
    enum: ValidGenereTypes,
  })
  getAllFilm(
    @Query('page') queryPage: number,
    @Query('filter') queryFilter: FilterDTO,
  ) {
    return this.filmsService.getAllFilm(queryPage, queryFilter)
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getFilm(@Param() id: string) {
    return this.filmsService.getFilm(id)
  }

  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id' })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        const name = req.params.id;
        callback(null, name);
      }
    })
  }))
  @Post('/:id/cartel')
  uploadFile(
    @Param() id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filmsService.updateCartel(id)
  }

  @Put('/:id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  updateFilm(
    @Param() id: string,
    @Body() update: UpdateFilmDTO
  ) {
    return this.filmsService.updateFilm(id, update)
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id' })
  deleteFilm(@Param() id: string) {
    return this.filmsService.deleteFilm(id)
  }
}
