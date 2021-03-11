import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { ExpenseComponent } from "./expense.component";
import { AddExpenseButtonComponent } from './add-expense-button/add-expense-button.component';



@NgModule({
  declarations: [
    ExpenseCreateComponent,
    ExpenseComponent,
    AddExpenseButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports : [
    ExpenseComponent,
    ExpenseCreateComponent,
    AddExpenseButtonComponent
  ]
})
export class ExpenseModule { }
