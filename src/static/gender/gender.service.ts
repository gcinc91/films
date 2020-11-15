import { Injectable } from '@nestjs/common';
import { GenderRepository } from './repositories/gender.repository';

@Injectable()
export class GenderService {
  constructor(private readonly repository: GenderRepository) { }

  create(body) {
    return this.repository.save(body);
  }

  listGenders() {
    return this.repository.find();
  }

  getGenderById(id) {
    return this.repository.findOne(id);
  }

  getGenderByName(name) {
    return this.repository.findOne({ GenderType: name });
  }

}
