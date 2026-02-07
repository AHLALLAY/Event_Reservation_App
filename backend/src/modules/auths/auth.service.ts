import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/users.service";
import { RegisterDto } from "./dtos/register.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtServcice: JwtService,
    ) { }

    async register(userData: RegisterDto){
        const user = await this.userService.createUser(userData);

        const token = this.jwtServcice.sign({
            id: user.id,
            email: user.email,
            role: user.role
        });
        return {user, token}
    }
}