import { Inject, Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { GenderModule } from './static/gender/gender.module'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    FilmsModule,
    GenderModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.user'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        }
      }
    }

    ),
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