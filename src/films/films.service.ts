import { Injectable } from '@nestjs/common';
import { GenderService } from 'src/static/gender/gender.service';
import { FilmDto } from './dto/film.dto';
import { FilmRepository } from './repositories/film.repository';

@Injectable()
export class FilmsService {
  constructor(
    private repository: FilmRepository,
    private genderService: GenderService
  ) { }

  async create(film: FilmDto) {
    const gender = await this.genderService.getGenderByName(film.gender);
    const filmReq = {
      ...film,
      gender,
      genderId: gender.id,
    }
    return this.repository.save(filmReq)
  }

  getAllFilm() {
    return this.repository.find()
  }

  getFilm(id) {
    return this.repository.findOne(id)
  }

  updateFilm(id, update) {
    return this.repository.update(id, update)
  }

  updateCartel(id: string) {
    return this.repository.update(id, { cartel: 'storage' })
  }

  async deleteFilm(id) {
    return this.repository.delete(id)
  }


}
