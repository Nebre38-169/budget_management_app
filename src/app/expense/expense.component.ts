import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Expense } from '../class/expense/expense';
import { ExpenseService } from '../service/expense/expense.service';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {

  @Input() expense : Expense;

  constructor(private expenseService : ExpenseService,
    private modalCtrl : ModalController) { }

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

  async onEdit(){
    const modal = await this.modalCtrl.create({
      component : ExpenseCreateComponent,
      componentProps : {
        'expenseEdit' : this.expense
      }
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(!data.dismissed){
      this.expenseService.fecthExpenseOfMonth(
        this.expense.date.getFullYear(),
        this.expense.date.getMonth()+1,
        this.expense.user);
      this.expenseService.fecthMonthOfUser(this.expense.user);
    }
  }

}
