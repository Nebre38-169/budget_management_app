import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthPageRoutingModule } from './month-routing.module';

import { MonthPage } from './month.page';
import { ExpenseModule } from '../expense/expense.module';
import { CreateMonthComponent } from './create-month/create-month.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseModule,
    MonthPageRoutingModule
  ],
  declarations: [
    MonthPage,
    CreateMonthComponent
  ],
  exports : [
    CreateMonthComponent
  ]
})
export class MonthPageModule {}
