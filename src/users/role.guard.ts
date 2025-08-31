
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Import or define the Role type
import { Role } from './model/user.model'; // Adjust the path if Role is defined elsewhere
import { ROLES_KEY } from './role.decorator';



@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
  if (!user) {
    return false;
  }
  return requiredRoles.some((role) => user.role === role);
  }
}
