import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service.js";
import { UnauthorizedException } from "@nestjs/common";


@Injectable()
export class AuthService{
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ){}

    // login Logic 
    async login(email: string, password: string) {
  const user = await this.usersService.findByEmail(email);
  // next: what do we do if user is null?
  if (user == null){
    throw new UnauthorizedException('Invalid Credentials');
  }
  
  const passwordMatches = await bcrypt.compare(password, user.password);
// then: what should happen if passwordMatches is false?
 if (!passwordMatches){
    throw new UnauthorizedException('Invalid Credentials');
  }
   return this.jwtService.sign({ userId: user.id, email: user.email });
 
} 
}
