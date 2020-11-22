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

  async getAllFilm(page = 1, filters) {
    const skipPage = page === 1 ? 0 : (page - 1) * 10;
    let filterObj;
    let findObject = {
      skip: skipPage,
      take: 10,
    };

    if (filters) {
      const gender = await this.genderService.getGenderByName(filters);
      filterObj = {
        gender
      }
    }

    return this.repository.find({
      ...findObject,
      where: filterObj
    })
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
