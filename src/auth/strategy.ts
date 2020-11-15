
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey' //configService.get('jwt.secret'),
    });
  }

  async validate(payload) {
    console.log('deberia apsar por aqui', payload)
    const user = await this.userService.getUserById({ id: payload.userId });
    if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}