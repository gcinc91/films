import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    private readonly repository: UserRepository
  ) { }

  async create(user) {

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    return this.repository.save(user);
  }

  getAllUser() {
    return this.repository.find();
  }

  getUserById(id) {
    return this.repository.findOne(id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.repository.findOne({
      where: { username },
    });
  }

  async checkIfUserExists(username: string): Promise<boolean> {
    const user = await this.findByUsername(username);
    return user !== undefined && user.id !== undefined;
  }
}
