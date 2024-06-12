import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token:string){
    setCookie('token-trello', token, {expires: 365, path: '/'})
  }

  getToken(){
    const token  = getCookie('token-trello')
    return token;
  }

  removeToken(){
    removeCookie('token-trello')
  }

  removeRefreshToken(){
    removeCookie('refresh-token-trello')
  }


  saveRefreshToken(token:string){
    setCookie('refresh-token-trello', token, {expires: 365, path: '/'})
  }

  getRefreshToken(){
    const token  = getCookie('refresh-token-trello')
    return token;
  }



  isValidTOken(){
    const token = this.getToken();
    if(!token){
      return false;
    }

    const decodeToken = jwtDecode<JwtPayload>(token);
    if(decodeToken && decodeToken?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp)
      const today = new Date();
      return tokenDate.getTime() > today.getTime()
    }

    return false;
  }

  isValidRefeshTOken(){
    const token = this.getRefreshToken();
    if(!token){
      return false;
    }

    const decodeToken = jwtDecode<JwtPayload>(token);
    if(decodeToken && decodeToken?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp)
      const today = new Date();
      return tokenDate.getTime() > today.getTime()
    }

    return false;
  }
}
