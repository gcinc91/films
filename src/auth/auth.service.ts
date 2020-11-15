import { JwtService } from '@nestjs/jwt';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(userData: UserDto): Promise<User> {
    const user = await this.userService.findByUsername(userData.username);
    const passwordOk = await bcrypt.compareSync(userData.password, user.password);
    if (
      !user ||
      !passwordOk
    ) {
      throw new UnauthorizedException('user or password are incorrect')
    }

    return user;
  }

  public async signIn(userData: UserDto): Promise<any | { status: number }> {
    return this.validateUser(userData).then((user) => {
      const payload = {
        userId: user.id,
        username: user.username,
      }
      const accessToken = this.jwtService.sign(payload);

      return accessToken;

    });
  }

  public async signUp(user: UserDto): Promise<any | { status: number }> {
    return this.userService.checkIfUserExists(user.username).then((userData) => {
      if (userData) {
        throw new ConflictException(
          `user ${userData} already exits!`,
        )
      }
      this.userService.create(user)
    });
  }
}

