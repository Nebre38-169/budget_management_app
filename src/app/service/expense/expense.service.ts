import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from 'src/app/class/expense/expense';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends BaseService<Expense> {

  constructor(protected http : HttpClient) {
    super(http);
    this.baseUrl = environment.baseUrl.base+environment.baseUrl.expense;
   }

  protected jsonToObjectConvert(info: any): Expense {
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

  protected objectToJsonConvert(obj: Expense) {
    return {
      user : obj.user,
      amount : obj.amount,
      date : obj.date
    }
  }

  
}
