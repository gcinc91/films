import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderController } from './gender.controller';
import { GenderService } from './gender.service';
import { Gender } from './entities/gender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  exports: [GenderService],
  controllers: [GenderController],
  providers: [GenderService],
})
export class GenderModule { }
