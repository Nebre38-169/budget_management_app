import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Base } from 'src/app/class/base/base';
import { ServeurResponse } from 'src/app/class/ServeurResponse/serveur-response';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseWithDependanceService<T extends Base> extends BaseService<T> {

  constructor(protected http : HttpClient) {
    super(http);
   }

  public getByDependance(id : number) : Observable<T[] | Error>{
    return this.http.get<ServeurResponse>(this.baseUrl+`/dependance/${id}`)
    .pipe(
      map(value=>{
        if(value.status==='success'){
          let result : T[] = [];
          for(let info of value.result){
            result.push(this.jsonToObjectConvert(info));
          }
          return result;
        } else {
          return new Error(value.result);
        }
      })
    )
  }
}
