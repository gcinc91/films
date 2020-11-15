import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { GenderModule } from './static/gender/gender.module'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from '../config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    FilmsModule,
    GenderModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'films',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MulterModule.register({
      dest: './cartel',
    })
  ],
})

export class AppModule { }