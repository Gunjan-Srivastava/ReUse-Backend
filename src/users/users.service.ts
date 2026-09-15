import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity.js';
import { CreateUserDto } from './create-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Never store the raw password. bcrypt.hash() one-way scrambles it —
    // this can be checked against later, but never reversed back to the
    // original text. "10" is the salt rounds (scrambling strength).
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Spread all the DTO's fields in first (...createUserDto), THEN
    // override "password" with the hashed version. Order matters here:
    // whichever value is written LAST for a given field wins, so the
    // hashed password must come after the spread, not before.
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }
}
