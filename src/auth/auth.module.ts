import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.get('jwt.secret'),
                    signOptions: { expiresIn: configService.get('jwt.expiration') }
                }
            }
        }),
    ],
    controllers: [AuthController],
    exports: [
        JwtStrategy,
        PassportModule
    ],
    providers: [
        UsersService,
        AuthService,
        JwtStrategy
    ]
})
export class AuthModule { }