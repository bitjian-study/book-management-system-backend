import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class UserService {
  async login(loginDto: LoginDto) {
    const userList: User[] = await this.dbService.read();
    const user: User = userList.find(
      (user) => user.username === loginDto.username,
    );
    if (!user) {
      throw new BadRequestException('用户不存在，请注册或者确认账号');
    }
    if (loginDto.password !== user.password) {
      throw new BadRequestException('密码错误，请检查密码');
    }
    return user;
  }
  @Inject(DbService)
  private dbService: DbService;
  async register(regisTryDto: RegisterUserDto) {
    const userList: User[] = await this.dbService.read();
    const user: User = userList.find(
      (user) => user.username === regisTryDto.username,
    );
    if (user) {
      throw new BadRequestException('该用户已经注册');
    }
    const newUser: User = new User();
    newUser.username = regisTryDto.username;
    newUser.password = regisTryDto.password;
    userList.push(newUser);
    await this.dbService.write(userList);
    return newUser;
  }
}
