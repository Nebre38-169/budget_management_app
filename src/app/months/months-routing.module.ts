import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayAllMonthComponent } from './display-all-month/display-all-month.component';
import { DisplayOneMonthComponent } from './display-one-month/display-one-month.component';


const routes: Routes = [
  {
    path: '',
    component: DisplayAllMonthComponent
  },
  {
      path : ':id',
      component : DisplayOneMonthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthsPageRoutingModule {}