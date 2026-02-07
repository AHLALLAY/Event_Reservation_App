import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import { UserService } from "../users/users.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtServcice: JwtService,
    ) { }

    async register(userData: RegisterDto) {
        const user = await this.userService.createUser(userData);

        const token = this.jwtServcice.sign({
            id: user.id,
            email: user.email,
            role: user.role
        });
        return { user, token }
    }

    async login(userCredential: LoginDto) {
        const user = await this.userService.findByEmail(userCredential.email);
        if (!user || !(await bcrypt.compare(userCredential.password, user.password))) throw new UnauthorizedException();

        const token = this.jwtServcice.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        const { password: _, ...rest } = user;
        return { user: rest, token };
    }

    logout() {
        return { message: 'Déconnexion ok' };
    }
}