import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { DateToMonthPipe } from '../pipe/date-to-month.pipe';
import { ExpenseModule } from '../expense/expense.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpenseModule,
    HomePageRoutingModule
  ],
  declarations: [
    DateToMonthPipe,
    HomePage
  ]
})
export class HomePageModule {}
