import { BaseEntity } from 'src/static/base.entity';
import { Gender } from 'src/static/gender/entities/gender.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';


@Entity()
export class Film extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  cartel: string;

  @ManyToOne(type => Gender)
  @JoinColumn()
  gender: Gender;

  @Column({nullable: true})
  genderId: number;

}