import { Component, Input, OnInit } from '@angular/core';
import { Expense } from '../class/expense/expense';
import { ExpenseService } from '../service/expense/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {

  @Input() expense : Expense;

  constructor(private expenseService : ExpenseService) { }

  ngOnInit() {}

  onDelete(){
    this.expenseService.delete(this.expense.getId())
    .subscribe(value =>{
      console.log(value);
      if(value instanceof Error){
        console.log(value);
      } else {
        this.expenseService.fecthExpenseOfMonth(
          this.expense.date.getFullYear(),
          this.expense.date.getMonth()+1,
          this.expense.user
        )
        this.expenseService.fecthMonthOfUser(
          this.expense.user
        )
      }
    })
  }

}
