import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const token = this.extractToken(req);
        if (!token) throw new UnauthorizedException('Token manquant');

        try {
            const payload = await this.jwtService.verifyAsync(token);
            req['user'] = { id: payload.id, email: payload.email, role: payload.role };
            return true;
        } catch {
            throw new UnauthorizedException('Token Invalide');
        }
    }

    private extractToken(req: Request): string | undefined {
        const token = req.headers.authorization?.split(' ')[1];
        return token;
    }
}