import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthPageRoutingModule } from './month-routing.module';

import { MonthPage } from './month.page';
import { DateToMonthPipe } from '../pipe/date-to-month.pipe';
import { ExpenseModule } from '../expense/expense.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseModule,
    MonthPageRoutingModule
  ],
  declarations: [
    DateToMonthPipe,
    MonthPage]
})
export class MonthPageModule {}
