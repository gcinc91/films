import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export class BaseEntity {
  @CreateDateColumn({ nullable: true})
  @Exclude()
  createAt: Date;

  @UpdateDateColumn({ nullable: true })
  @Exclude()
  updatedAt: Date;
}
