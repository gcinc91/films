import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-in')
  async signIn(
    @Body() user: UserDto,
    @Req() request,
  ): Promise<any> {
    return this.authService.signIn(user);
  }

  @Post('sign-up')
  async signUp(@Body() user: UserDto) {
    return this.authService.signUp(user);
  }

}

