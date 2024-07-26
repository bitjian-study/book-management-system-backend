import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { LoginDto } from './dto/loginDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.userService.register(registerUserDto);
    return user;
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    await this.userService.login(loginDto);
    return 'login success';
  }
}
