import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Expense } from 'src/app/class/expense/expense';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ExpenseService } from 'src/app/service/expense/expense.service';

@Component({
  selector: 'app-one-expense',
  templateUrl: './one-expense.component.html',
  styleUrls: ['./one-expense.component.scss'],
})
export class OneExpenseComponent implements OnInit {
  @Input() expenseOBJ : Expense;
  @Input() monthId : number;

  constructor(
    private auth : AuthService,
    private expense : ExpenseService,
    private modalCtrl : ModalController
  ) { }

  ngOnInit() {}

  onDelete(){
    this.expense.delete(this.expenseOBJ.getId())
    .subscribe(value =>{
      this.expense.fetchForDependance(this.monthId,'month');
    })
  }

  async onEdit(){
    
  }
}
