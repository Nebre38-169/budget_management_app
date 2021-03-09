import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base } from 'src/app/class/base/base';
import { User } from 'src/app/class/user/user';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User>{
  
  constructor(protected http : HttpClient) {
    super(http);
    this.baseUrl = environment.baseUrl.base+environment.baseUrl.user
   }

  public jsonToObjectConvert(info: any): User {
    return new User(
      Number.parseInt(info.id),
      new Date(info.creationDate),
      new Date(info.updateDate),
      info.email,
      info.firstName,
      info.lastName,
      Number.parseFloat(info.budget)
    )
  }

  public objectToJsonConvert(obj: User) {
    return {
      email : obj.email,
      password : null,
      firstName : obj.firstName,
      lastName : obj.lastName,
      budget : obj.budget
    }
  }
}
