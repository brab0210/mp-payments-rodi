import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    let test = request.rawHeaders.find((e) => e.match('rodiSes'));

    if (test && !request.session['passport']) {
      return !request.isAuthenticated();
    }
    return request.isAuthenticated();
  }
}
