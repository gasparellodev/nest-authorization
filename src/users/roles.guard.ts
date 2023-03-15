import { User } from './entities/user.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './entities/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //does it have access?
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('----->', requireRoles);

    if (!requireRoles) {
      return true;
    }

    //const { user } = context.switchToHttp().getRequest();

    const user: User = {
      name: 'Vinicius',
      roles: [Role.USER],
    };

    return requireRoles.some((role) => user.roles.includes(role));
  }
}
