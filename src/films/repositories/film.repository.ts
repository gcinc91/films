import { EntityRepository, Repository } from 'typeorm';
import { Film } from '../entities/film.entity';

@EntityRepository(Film)
export class FilmRepository extends Repository<Film> {
}
