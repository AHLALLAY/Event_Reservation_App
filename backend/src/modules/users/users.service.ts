import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { RegisterDto } from "../auths/dtos/register.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    async createUser(user: RegisterDto) {
        const isExisting = await this.userRepo.findOne({ where: { email: user.email } });
        if (isExisting) throw new ConflictException('Email déjà utilisé');
        const hashedPwd = await bcrypt.hash(user.password, 10);
        const newUser = this.userRepo.create({
            fullName: user.fullName,
            email: user.email,
            password: hashedPwd,
            role: user.role,
        });

        const saved = await this.userRepo.save(newUser);
        const { password: _, ...rest } = saved;
        return rest;
    }

    async findByEmail(email: string) {
        return this.userRepo.findOne({ where: { email } });
    }

    async findById(id: string) {
        return this.userRepo.findOne({ where: { id } });
    }
}