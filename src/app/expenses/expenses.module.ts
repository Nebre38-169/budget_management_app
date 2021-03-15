import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OneExpenseComponent } from './one-expense/one-expense.component';
import { CreateMonthComponent } from '../months/create-month/create-month.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';



@NgModule({
  declarations: [
    OneExpenseComponent,
    CreateExpenseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports : [
    OneExpenseComponent,
    CreateExpenseComponent
  ]
})
export class ExpensesModule { }
