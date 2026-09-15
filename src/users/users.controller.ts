import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './create-user.dto.js';

// @Controller('users') means every route here starts with /users
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // POST /users — sign up a new user
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
