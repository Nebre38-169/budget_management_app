import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServeurResponse } from 'src/app/class/ServeurResponse/serveur-response';
import { User } from 'src/app/class/user/user';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser : User;
  userAsSubject : Subject<User>;

  constructor(private http : HttpClient,
    private UserService : UserService) { }


  public login(email : string, password : string) : Observable<User | Error> {
    return this.http.post<ServeurResponse>(
      environment.baseUrl.base+environment.baseUrl.auth+`/login`,
      {'email':email,'password' : this.getCryptedPass(password)}
    ).pipe(
      map(value =>{
        if(value.success==='success'){
          this.loggedUser = this.UserService.jsonToObjectConvert(value.message.user);
          this.updateUser();
          localStorage.setItem('access_token',value.message.token);
          return this.loggedUser;
        } else {
          return new Error(value.message);
        }
      })
    )
  }

  public logout(id : number) : Observable<boolean | Error>{
    return this.http.post<ServeurResponse>(
      environment.baseUrl.base+environment.baseUrl.auth+`/logout`,
      {'idUser':id}
    ).pipe(
      map(value =>{
        if(value.success==='success'){
          localStorage.removeItem('access_token');
          this.loggedUser = null;
          this.updateUser();
          return true;
        } else {
          return new Error(value.message);
        }
      })
    )
  }

  public signin(user : User,pass : string) : Observable<User | Error>{
    let body = this.UserService.objectToJsonConvert(user);
    body.password = this.getCryptedPass(pass);
    return this.http.post<ServeurResponse>(
      environment.baseUrl.base+environment.baseUrl.auth+`/signin`,
      body
    ).pipe(
      map(value =>{
        if(value.success==='success'){
          user.setId(value.message);
          return user;
        } else {
          return new Error(value.message);
        }
      })
    )
  }


  private updateUser(){
    this.userAsSubject.next(this.loggedUser);
  }

  private getCryptedPass(pass : string) : string {
    let hash = CryptoJS.SHA256(pass);
    let cryptedPassword = hash.toString(CryptoJS.enc.Utf16);
    return cryptedPassword;
  }
}
