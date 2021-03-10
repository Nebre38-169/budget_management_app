import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthPageRoutingModule } from './month-routing.module';

import { MonthPage } from './month.page';
import { DateToMonthPipe } from '../pipe/date-to-month.pipe';
import { ExpenseComponent } from '../expense/expense.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthPageRoutingModule
  ],
  declarations: [
    ExpenseComponent,
    DateToMonthPipe,
    MonthPage]
})
export class MonthPageModule {}
