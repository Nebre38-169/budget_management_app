import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Expense } from 'src/app/class/expense/expense';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ExpenseService } from 'src/app/service/expense/expense.service';

@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.scss'],
})
export class ExpenseCreateComponent implements OnInit {
  public expenseName : string;
  public expenseAmount : number;
  public expenseDate : Date;

  constructor(private modalCtrl : ModalController,
    private auth : AuthService,
    private expense : ExpenseService) { }

  ngOnInit() {}

  onDismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  onSubmit(){
    let newExpense = new Expense(
      undefined,
      this.auth.getId(),
      this.expenseName,
      this.expenseAmount,
      this.expenseDate,
      undefined,
      undefined
    )
    this.expense.createNew(newExpense).subscribe(
      value =>{
        if(value instanceof Error){
          console.log(value);
        } else {
          this.modalCtrl.dismiss({
            'dismissed' : false
          })
        }
      }
    )
  }

}
