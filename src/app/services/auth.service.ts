import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(email:string, password:string){
    return this.http.post(`${environment.API_URL}/api/v1/auth/login`, { email, password })
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
}
