import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() userData: RegisterDto) {
        return this.authService.register(userData);
    }

    @Post('login')
    async login(@Body() userCredential: LoginDto){
        return await this.authService.login(userCredential);
    }

    @Get('logout')
    logout(){
        return this.authService.logout();
    }
}