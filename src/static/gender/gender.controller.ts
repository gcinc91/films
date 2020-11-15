import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateGenderDto } from './dto/gender.dto';
import { GenderService } from './gender.service';

@ApiTags('Gender')
@Controller('Gender')
export class GenderController {
  constructor(public service: GenderService) { }

  @Post()
  create(@Body() body: CreateGenderDto) {
    return this.service.create(body)
  }

  @Get()
  listGenders() {
    return this.service.listGenders()
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getGender(@Param() id: string) {
    return this.service.getGenderById(id)
  }
}
