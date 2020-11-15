import { Controller, ConflictException, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';


@ApiTags('Usuarios')
@Controller('user')
export class UsersController {
  constructor(
    public usersService: UsersService
  ) { }

  @Post('')
  async create(
    @Body() user: UserDto,
  ) {
    return this.usersService.create(user);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUser();
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  async getUser(@Param() id: string) {
    return this.usersService.getUserById(id);
  }
}
