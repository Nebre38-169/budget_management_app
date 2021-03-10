import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToMonth'
})
export class DateToMonthPipe implements PipeTransform {
  private monthListFr = [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre'
  ]
  
  transform(value: Date, ...args: unknown[]): string {
    return `${this.monthListFr[value.getMonth()]} ${value.getFullYear()}`
  }

}
