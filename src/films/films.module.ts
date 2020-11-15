import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsController } from './films.controller';
import { Film } from './entities/film.entity';
import { FilmsService } from './films.service';
import { Gender } from '../static/gender/entities/gender.entity';
import { GenderService } from 'src/static/gender/gender.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Film, Gender])],
    controllers: [FilmsController],
    exports: [FilmsService],
    providers: [FilmsService, GenderService],
})
export class FilmsModule { }
