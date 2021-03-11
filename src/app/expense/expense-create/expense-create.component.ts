import { Component, Input, OnInit } from '@angular/core';
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
  @Input() expenseEdit : Expense;

  public expenseName : string;
  public expenseAmount : number;
  public expenseDate : Date;


  constructor(private modalCtrl : ModalController,
    private auth : AuthService,
    private expense : ExpenseService) { }

  ngOnInit() {
    if(this.expenseEdit){
      this.expenseName = this.expenseEdit.name;
      this.expenseAmount = this.expenseEdit.amount;
      this.expenseDate = this.expenseEdit.date;
    }
  }

  onDismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  onSubmit(){
    if(this.expenseEdit){
      this.expenseEdit.date = new Date(this.expenseDate);
      this.expenseEdit.name = this.expenseName;
      this.expenseEdit.amount = this.expenseAmount;
      this.expense.edit(this.expenseEdit)
      .subscribe(value =>{
        if(value instanceof Error){
          console.log(value);
        } else {
          this.modalCtrl.dismiss({
            'dismissed' : false
          })
        }
      })
    } else {
      let newExpense = new Expense(
        undefined,
        this.auth.getId(),
        this.expenseName,
        this.expenseAmount,
        new Date(this.expenseDate),
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
}
