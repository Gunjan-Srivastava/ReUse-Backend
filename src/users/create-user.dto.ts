import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

// DTO for signing up a new user. Enforced by the global ValidationPipe.
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  // @IsEmail() checks the value is actually shaped like a real email address.
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  // At least 6 characters long.
  @MinLength(6)
  // Regex pattern: must contain at least one digit (0-9) AND at least
  // one special character. The custom "message" is shown to the client
  // instead of a generic validation error.
  @Matches(/(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message: 'password must contain at least one number and one special character',
  })
  password: string;
}
