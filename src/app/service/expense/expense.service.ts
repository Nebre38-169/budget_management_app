import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense } from 'src/app/class/expense/expense';
import { environment } from 'src/environments/environment';
import { BaseWithDependanceService } from '../base/base-with-dependance.service';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends BaseWithDependanceService<Expense> {
  public monthValue : Expense[];

  constructor(protected http : HttpClient) {
    super(http);
    this.baseUrl = environment.baseUrl.base+environment.baseUrl.expense;
   }

  public jsonToObjectConvert(info: any): Expense {
    return new Expense(
      Number.parseInt(info.id),
      Number.parseInt(info.idUser),
      info.name,
      Number.parseFloat(info.amount),
      new Date(info.date),
      new Date(info.creationDate),
      new Date(info.updateDate)
    )
  }

  public objectToJsonConvert(obj: Expense) {
    return {
      user : obj.user,
      amount : obj.amount,
      name : obj.name,
      date : obj.date
    }
  }

  public getExpenseOfMonth(year : number, month : number, id : number) : Observable<Expense[]>{
    return this.getCondition(
      ` user=${id} AND YEAR(expense.date)=${year} AND MONTH(expense.date)=${month}`
    ).pipe(
      map(
        value =>{
          if(value instanceof Error){
            //TODO : handle error
          } else {
            return value;
          }
        }
      )
    )
  }

  public getTotal(eList : Expense[]) : number{
    let result = 0;
    for(let e of eList){
      result += e.amount;
    }
    return result;
  }


  public getMonthOfUser(id : number) : Observable<Expense[]> {
    return this.getCondition(
      ` user=${id} GROUP BY MONTH(expense.date)`,
      `date,SUM(expense.amount) AS 'amount'`
    ).pipe(
      map(
        value =>{
          if(value instanceof Error){
            //TODO : handle error
          } else {
            this.monthValue = value;
            return this.monthValue;
          }
        })
    )
  }

  
}
