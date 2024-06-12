import { Injectable } from '@angular/core';
import {  CanActivate, Router} from '@angular/router';
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(
    private tokenService:TokenService,
    private router:Router
  ){

  }
  
  canActivate() : boolean
    {
      const isValidTOken = this.tokenService.isValidRefeshTOken()
    if(isValidTOken) {
      this.router.navigate(['/app/boards'])
      return false
    }

    return true
      
  }
  
}
