import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServeurResponse } from 'src/app/class/ServeurResponse/serveur-response';
import { User } from 'src/app/class/user/user';
import { environment } from 'src/environments/environment';
import { ExpenseService } from '../expense/expense.service';
import { MonthService } from '../month/month.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUser : User;
  public userAsSubject : Subject<User> = new Subject<User>();

  constructor(private http : HttpClient,
    private UserService : UserService,
    private month : MonthService) { }



  public login(email : string, password : string, alwaysLog : boolean) : Observable<User | Error> {
    console.log('trying to connect');
    return this.http.post<ServeurResponse>(
      environment.baseUrl.base+environment.baseUrl.auth+`/login`,
      {'email':email,'password' : this.getCryptedPass(password)}
    ).pipe(
      map(value =>{
        if(value.status==='success'){
          this.loggedUser = this.UserService.jsonToObjectConvert(value.result.user);
          this.updateUser();
          localStorage.setItem('access_token',value.result.token);
          localStorage.setItem('user_email',this.loggedUser.email);
          if(alwaysLog){
            localStorage.setItem('user_password',this.getCryptedPass(password));
          }
          this.month.fetchForDependance(this.loggedUser.getId(),'user');
          this.updateUser();
          return this.loggedUser;
        } else {
          return new Error(value.result);
        }
      })
    )
  }

  public autologin(){
    return this.http.post<ServeurResponse>(
      environment.baseUrl.base+environment.baseUrl.auth+`/autoLogin`,
      {
        email : localStorage.getItem('user_email'),
        token : localStorage.getItem('access_token')
      }
    ).pipe(
      map(value =>{
        if(value.status==='success'){
          this.loggedUser = this.UserService.jsonToObjectConvert(value.result.res);
          this.updateUser();
          localStorage.setItem('access_token',value.result.newToken);
          localStorage.setItem('user_email',this.loggedUser.email);
          this.month.fetchForDependance(this.loggedUser.getId(),'user');
          return this.loggedUser;
        } else {
          return new Error('Missing information');
        }
      })
    )
  }

  public autoLoginWithPass() : Observable<User |Error>{
    let email = localStorage.getItem('user_email');
    let password = localStorage.getItem('user_password');
    return this.http.post<ServeurResponse>(
      environment.baseUrl.base+environment.baseUrl.auth+`/login`,
      {'email':email,'password' : password}
    ).pipe(
      map(value =>{
        if(value.status==='success'){
          this.loggedUser = this.UserService.jsonToObjectConvert(value.result.user);
          localStorage.setItem('access_token',value.result.token);
          localStorage.setItem('user_email',this.loggedUser.email);
          this.month.fetchForDependance(this.loggedUser.getId(),'user');
          this.updateUser();
          return this.loggedUser;
        } else {
          return new Error(value.result);
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
        if(value.status==='success'){
          localStorage.removeItem('access_token');
          localStorage.removeItem('user_password');
          localStorage.removeItem('user_email');
          this.loggedUser = null;
          this.updateUser();
          return true;
        } else {
          return new Error(value.result);
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
        if(value.status==='success'){
          user.setId(value.result);
          return user;
        } else {
          return new Error(value.result);
        }
      })
    )
  }

  public editPassword(user : User, oldPass : string, newPass : string) : Observable<User | Error>{
    let body = {
      id : user.getId(),
      oldPassword : this.getCryptedPass(oldPass),
      newPassword : this.getCryptedPass(newPass)
    }
    return this.http.post<ServeurResponse>(
      environment.baseUrl.base+environment.baseUrl.auth+`/changePassword`,
      body
    ).pipe(
      map(value =>{
        if(value.status==='success'){
          return user;
        } else {
          return new Error(value.result);
        }
      })
    )
  }

  private logInInformation(){

  }

  public getUser() : User {
    return this.loggedUser;
  }

  public getId() : number {
    if(this.loggedUser){
      return this.loggedUser.getId();
    } else {
      return null
    }
  }

  public isLogged() : boolean {
    return this.loggedUser!=undefined;
  }


  public updateUser(){
    this.userAsSubject.next(this.loggedUser);
  }

  private getCryptedPass(pass : string) : string {
    let hash = CryptoJS.SHA256(pass);
    let cryptedPassword = Base64.stringify(hash)
    return cryptedPassword;
  }
}
