import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../../../shared/user.role";

export const ROLES_KEY = 'roles';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
        if (!requiredRole?.length) return true;
        const { user } = context.switchToHttp().getRequest();
        if (!user?.role) throw new ForbiddenException('Accés Refusé');
        if (!requiredRole.includes(user.role)) throw new ForbiddenException('Role inexiste')
        return true;
    }
}