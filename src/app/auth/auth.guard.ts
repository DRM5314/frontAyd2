import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const requireAuthentication: boolean = route.data['requireAuthentication'] || false;

    if (requireAuthentication && !this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    let requiredRol: string[] = route.data['requiredRol'] || [];
    if (requiredRol.length === 0 && route.parent) {
      requiredRol = route.parent.data['requiredRoles'] || [];
    }

    if (requiredRol.length > 0) {
      const hasRequiredRole = requiredRol.some(role => this.authService.hasRequiredRol(role));
      if (!hasRequiredRole) {
        this.router.navigate(['/homepage']);
        return false;
      }
      return true;
    }

    return true;
  }
}
