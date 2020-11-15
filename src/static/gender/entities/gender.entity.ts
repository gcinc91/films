
import { BaseEntity } from 'src/static/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('Gender')
export class Gender extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  GenderType: string;
}
