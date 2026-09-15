import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @MinLength(6)
  @Matches(/(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message: 'password must contain at least one number and one special character',
  })
  password: string;
}
