import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { ExpenseComponent } from './expense.component';



@NgModule({
  declarations: [
    ExpenseCreateComponent,
    ExpenseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ExpenseModule { }
