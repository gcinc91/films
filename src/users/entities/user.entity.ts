import { BaseEntity } from 'src/static/base.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';



@Entity()
export class User extends BaseEntity{

  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @PrimaryColumn()
  username: string;

  @PrimaryColumn()
  password: string;

}