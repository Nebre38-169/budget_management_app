import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Month } from 'src/app/class/month/month';
import { environment } from 'src/environments/environment';
import { BaseWithDependanceService } from '../base/base-with-dependance.service';

@Injectable({
  providedIn: 'root'
})
export class MonthService extends BaseWithDependanceService<Month> {
  

  constructor(protected http : HttpClient) {
    super(http);
    this.baseUrl = environment.baseUrl.base+environment.baseUrl.month;
   }

   public jsonToObjectConvert(info: any): Month {
    return new Month(
      parseInt(info.id),
      new Date(info.creationDate),
      new Date(info.updateDate),
      parseInt(info.user),
      new Date(info.startDate),
      new Date(info.endDate),
      parseFloat(info.total),
      parseFloat(info.budget)
    )
  }
  public objectToJsonConvert(obj: Month) {
    return {
      id : obj.getId(),
      user : obj.user,
      name : obj.name,
      startDate : `${obj.startDate.getFullYear()}-${obj.startDate.getMonth()+1}-${obj.startDate.getDate()}`,
      endDate : `${obj.endDate.getFullYear()}-${obj.endDate.getMonth()+1}-${obj.endDate.getDate()}`,
      total : obj.total,
      budget : obj.budget
    }
  }
}
