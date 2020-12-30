import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterModule,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthServerProvider } from "../auth/auth-jwt.service";
import { Principal } from "../auth/principal.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthServerProvider) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    if (!this.authService.getToken()) {
      this.router.navigate(["/sign"]);
      return false;
    }
    return true;
  }
}
