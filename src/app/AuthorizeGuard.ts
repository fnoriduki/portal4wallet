import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CognitoService } from "./cognito.service";

@Injectable({providedIn:'root'})
export class AuthorizeGuard implements CanActivate{
    constructor(private cognitoService: CognitoService,
        private route: ActivatedRoute,
        private router: Router)
    {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(!this.cognitoService.isTokenExpired())
         return true;
         else
          return  this.router.navigate(['/SignIn']);
    }
}