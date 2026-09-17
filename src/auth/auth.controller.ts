import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { LoginDto } from "./login.dto.js";



@Controller('auth')

export class AuthController{
    constructor(private authService: AuthService) {}
   
    // POST /auth/login — log in a  user
      @Post('login')
      login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.email, loginDto.password);
}
}