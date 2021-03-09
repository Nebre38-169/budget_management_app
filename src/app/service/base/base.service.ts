import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServeurResponse } from 'src/app/class/ServeurResponse/serveur-response';
import { map } from 'rxjs/operators';
import { Base } from 'src/app/class/base/base';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends Base> {
  protected baseUrl : string;
  private objectList : T[];
  public objectListObs : Subject<T[]>;

  constructor(protected http : HttpClient) { }

  private fecth(){
    this.http.get<ServeurResponse>(this.baseUrl).subscribe(
      value =>{
        this.objectList = [];
        if(value.success==='success'){
          for(let info of value.message){
            this.objectList.push(this.jsonToObjectConvert(info));
          }
        }
        this.update();
      }
    )
  }

  public getById(id : number) : Observable<T | Error>{
    return this.http.get<ServeurResponse>(this.baseUrl+`/id/${id}`).pipe(
      map(value =>{
        if(value.success==='success'){
          return this.jsonToObjectConvert(value.message);
        } else {
          return new Error(value.message);
        }
      })
    )
  }

  public getByKey(key : any) : Observable<T | Error>{
    return this.http.get<ServeurResponse>(this.baseUrl+`/key/${key}`).pipe(
      map(value =>{
        if(value.success==='success'){
          return this.jsonToObjectConvert(value.message);
        } else {
          return new Error(value.message);
        }
      })
    )
  }

  public createNew(newObject : T) : Observable< T | Error>{
    return this.http.post<ServeurResponse>(this.baseUrl,this.objectToJsonConvert(newObject))
    .pipe(
      map(value =>{
        if(value.success==='success'){
          newObject.setId(value.message);
          return newObject;
        } else {
          return new Error(value.message);
        }
      })
    )
  }

  public edit(updatedObject : T) : Observable<T | Error>{
    return this.http.put<ServeurResponse>(this.baseUrl+`/${updatedObject.getId()}`,this.objectToJsonConvert(updatedObject))
    .pipe(
      map(value =>{
        if(value.success==='success'){
          return updatedObject;
        } else {
          return new Error(value.message);
        }
      })
    )
  }

  public delete(id : number) : Observable<boolean | Error>{
    return this.http.delete<ServeurResponse>(this.baseUrl+`/${id}`).pipe(
      map(value =>{
        if(value.success==='success'){
          return true;
        } else {
          return new Error(value.message);
        }
      })
    )
  }

  private update(){
    this.objectListObs.next(this.objectList);
  }

  public abstract jsonToObjectConvert(info : any) : T;
  public abstract objectToJsonConvert(obj : T) : any; 

}
