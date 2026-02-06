import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { UserRole } from 'src/shared/user.role';

export class RegisterDto {
    @IsString()
    @MaxLength(30)
    fullName: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    password: string

    @IsEnum(UserRole)
    role: UserRole
}
