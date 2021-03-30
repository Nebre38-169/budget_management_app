import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Expense } from 'src/app/class/expense/expense';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ExpenseService } from 'src/app/service/expense/expense.service';
import { CreateExpenseComponent } from '../create-expense/create-expense.component';

@Component({
  selector: 'app-one-expense',
  templateUrl: './one-expense.component.html',
  styleUrls: ['./one-expense.component.scss'],
})
export class OneExpenseComponent implements OnInit {
  @Input() expenseOBJ : Expense;
  @Input() monthId : number;
  @Input() maxDate : string;
  @Input() minDate : string;

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
    let modal = await this.modalCtrl.create({
      component : CreateExpenseComponent,
      componentProps : {
        editedExpense : this.expenseOBJ,
        monthId : this.monthId,
        maxDate : this.maxDate,
        minDate : this.minDate
      }
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(!data.dismissed){
      this.expense.fetchForDependance(this.monthId,'month');
    }
  }
}
