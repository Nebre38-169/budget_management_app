import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthComponent } from './month/month.component';
import { DisplayAllMonthComponent } from './display-all-month/display-all-month.component';
import { DisplayOneMonthComponent } from './display-one-month/display-one-month.component';
import { CreateMonthComponent } from './create-month/create-month.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MonthsPageRoutingModule } from './months-routing.module';
import { ExpensesModule } from '../expenses/expenses.module';



@NgModule({
  declarations: [
    MonthComponent,
    DisplayAllMonthComponent,
    DisplayOneMonthComponent,
    CreateMonthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthsPageRoutingModule,
    ExpensesModule
  ]
})
export class MonthsModule { }
