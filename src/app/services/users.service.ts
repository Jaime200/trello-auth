import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { User } from '@models/user.model';
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private tokenService:TokenService
  ) { }

  getUser(){
    console.log()
    return this.http.get<User[]>(`${environment.API_URL}/api/v1/users`,{
        context: checkToken()
    })
  }


}
