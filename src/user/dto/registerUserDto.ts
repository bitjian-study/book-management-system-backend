import { IsNotEmpty, MinLength } from 'class-validator';
export class RegisterUserDto {
  @IsNotEmpty({ message: 'username is required' })
  @MinLength(3, { message: 'username must be at least 3 characters' })
  username: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password must be at least 6 characters' })
  password: string;
}
