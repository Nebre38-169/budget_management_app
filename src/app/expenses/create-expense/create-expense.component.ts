import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Expense } from 'src/app/class/expense/expense';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ExpenseService } from 'src/app/service/expense/expense.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.scss'],
})
export class CreateExpenseComponent implements OnInit {
  @Input() editedExpense : Expense;
  @Input() monthId : number;
  @Input() minDate : string;
  @Input() maxDate : string;

  public name : string;
  public amount : number;
  public date : string;

  constructor(
    private modalCtrl : ModalController,
    private auth : AuthService,
    private expense : ExpenseService
  ) { }

  ngOnInit() {
    if(this.editedExpense){
      this.name = this.editedExpense.name;
      this.date = `${this.editedExpense.date.getFullYear()}-${this.editedExpense.date.getMonth()+1}-${this.editedExpense.date.getDate()}`;
      this.amount = this.editedExpense.amount;
    }
  }

  onDismiss(){
    this.modalCtrl.dismiss({
      'dismissed' : true
    });
  }

  onSubmit(){
    if(this.editedExpense){
      this.editedExpense.date = new Date(this.date);
      this.editedExpense.name = this.name;
      this.editedExpense.amount = this.amount;
      this.expense.edit(this.editedExpense)
      .subscribe(value =>{
        if(value instanceof Error){
          console.log(value);
        } else {
          this.modalCtrl.dismiss({
            'dismissed':false
          })
        }
      })
    } else {
      let newExpense = new Expense(
        undefined,
        undefined,
        undefined,
        this.auth.getId(),
        this.monthId,
        this.name,
        this.amount,
        new Date(this.date)
      )
      this.expense.createNew(newExpense)
      .subscribe(
        value =>{
          if(value instanceof Error){
            console.log(value);
          } else {
            this.modalCtrl.dismiss({
              'dismissed':false
            })
          }
        }
      )
    }
  }

}
