import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: 'temp',
            signOptions: { expiresIn:'1h'}
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports:[],

})

export class AuthModule{}