import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // next: pull the Authorization header out of the request
  const authHeader = request.headers['authorization'];
if (!authHeader) {
  throw new UnauthorizedException('No token provided');
}
const token = authHeader.split(' ')[1]; // "Bearer <token>" → grab the part after the space
    try {
    const payload = this.jwtService.verify(token);
    request.user = payload;
    return true;
  } catch (error) {
    throw new UnauthorizedException('Invalid or expired token');
  }

}
}
