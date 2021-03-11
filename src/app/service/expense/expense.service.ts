import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense } from 'src/app/class/expense/expense';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { BaseWithDependanceService } from '../base/base-with-dependance.service';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends BaseWithDependanceService<Expense> {
  public monthList : Subject<Expense[]> = new Subject<Expense[]>();
  public monthExpenses : Subject<Expense[]> = new Subject<Expense[]>();

  constructor(protected http : HttpClient) {
    super(http);
    this.baseUrl = environment.baseUrl.base+environment.baseUrl.expense;
   }

  public jsonToObjectConvert(info: any): Expense {
    return new Expense(
      Number.parseInt(info.id),
      Number.parseInt(info.user),
      info.name,
      Number.parseFloat(info.amount),
      new Date(info.date),
      new Date(info.creationDate),
      new Date(info.updateDate)
    )
  }

  public objectToJsonConvert(obj: Expense) {
    let dateValue;
    if(obj.date instanceof Date){
      dateValue = `${obj.date.getFullYear()}-${obj.date.getMonth()+1}-${obj.date.getDate()}`;
    } else {
      dateValue = obj.date;
    }
    return {
      user : obj.user,
      amount : obj.amount,
      name : obj.name,
      date : dateValue
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

  public fecthExpenseOfMonth(year : number,month : number, id : number) : void {
    this.getExpenseOfMonth(year,month,id)
    .subscribe(value =>{
      this.updateMontExpense(value);
    })
  }

  private updateMontExpense(value){
    this.monthExpenses.next(value);
  }

  private updateMonthList(value){
    this.monthList.next(value);
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
      ` user=${id} GROUP BY YEAR(expense.date),MONTH(expense.date)`,
      `date,SUM(expense.amount) AS 'amount'`
    ).pipe(
      map(
        value =>{
          if(value instanceof Error){
            //TODO : handle error
          } else {
            return value; 
          }
        })
    )
  }

  public fecthMonthOfUser(id : number) : void {
    this.getMonthOfUser(id).subscribe(
      value =>{
        this.updateMonthList(value);
      }
    )
  }

  
}
