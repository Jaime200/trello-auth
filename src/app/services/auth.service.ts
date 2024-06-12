import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { TokenService } from '@services/token.service';
import { ReponseLogin } from '@models/auth.model'
import { User } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<User | null>(null)
  constructor(
    private http: HttpClient,
    private tokenService:TokenService
  ) { }

  login(email:string, password:string){
    return this.http.post<ReponseLogin>(`${environment.API_URL}/api/v1/auth/login`, { email, password })
    .pipe(
      tap(response =>{
        this.tokenService.saveToken(response.access_token)
        this.tokenService.saveRefreshToken(response.refresh_token)

      } )
    )
  }

  register(name:string, password:string, email:string){
    return this.http.post(`${environment.API_URL}/api/v1/auth/register`, {name, email, password })    
    .pipe(
      catchError((error) => {
        //console.log("errror from service ", error)
        if (error.error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          return throwError('El usuario ya existe');
        }
        return throwError('Ups algo salio mal');
      })
    )
  }

  isAvailable(email:string){
    return this.http.post<{ isAvailable: boolean }>(`${environment.API_URL}/api/v1/auth/is-available`, { email })
  }

  registerAndLogin(name:string, password:string, email:string){
    return this.register(name, password ,email,).pipe(
      switchMap(()=> this.login(email, password))
    )
  }

  recovery(email:string){
    return this.http.post(`${environment.API_URL}/api/v1/auth/recovery`, 
    {email})
  }

  changePassword(token:string, newPassword: string){
    return this.http.post(`${environment.API_URL}/api/v1/auth/change-password`, 
    {token, newPassword})
  }

  logout(){
    this.tokenService.removeToken()
    this.tokenService.removeRefreshToken()
  }

  profile(){
    return this.http.get<User>(`${environment.API_URL}/api/v1/auth/profile`, {
      context: checkToken()
    }).pipe(
      tap(
        reponse =>{
          this.user$.next(reponse)
        }
      )
    )
  }

  getDataUser(){
    return this.user$.getValue();
  }
}
