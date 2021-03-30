import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Expense } from 'src/app/class/expense/expense';
import { Month } from 'src/app/class/month/month';
import { CreateExpenseComponent } from 'src/app/expenses/create-expense/create-expense.component';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ExpenseService } from 'src/app/service/expense/expense.service';
import { MonthService } from 'src/app/service/month/month.service';

@Component({
  selector: 'app-display-one-month',
  templateUrl: './display-one-month.component.html',
  styleUrls: ['./display-one-month.component.scss'],
})
export class DisplayOneMonthComponent implements OnInit,OnDestroy {
  public monthOBJ : Month;
  public expenseList : Expense[];
  public maxDate : string;
  public minDate : string;

  private exenpseSub : Subscription;
  constructor(
    private auth : AuthService,
    private month : MonthService,
    private expense : ExpenseService,
    private route : ActivatedRoute,
    private modalCtrl : ModalController
  ) { }
  ngOnDestroy(): void {
    this.exenpseSub.unsubscribe();
  }

  ngOnInit() {
    let monthId = this.route.snapshot.params['id'];
    this.month.getById(monthId)
    .subscribe(value =>{
      if(value instanceof Error){
        console.log(value);
      } else {
        this.monthOBJ = value;
        this.exenpseSub = this.expense.objectListObs
      .subscribe(value =>{
        this.expenseList = value;
        let total = 0;
        for(let e of this.expenseList){
          total+=e.amount;
        }
        total = Math.round(total*100)/100;
        this.monthOBJ.total = total;
        this.month.edit(this.monthOBJ).subscribe();
        this.minDate = Month.getDateStr(this.monthOBJ.startDate);
        this.maxDate = Month.getDateStr(this.monthOBJ.endDate);
      })
      }
    })
    this.expense.fetchForDependance(monthId,'month');
  }


  async onNewExpense(){
    const modal = await this.modalCtrl.create({
      component : CreateExpenseComponent,
      componentProps : {
        monthId : this.monthOBJ.getId(),
        minDate : Month.getDateStr(this.monthOBJ.startDate),
        maxDate : Month.getDateStr(this.monthOBJ.endDate)
      }
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(!data.dismissed){
      this.expense.fetchForDependance(this.monthOBJ.getId(),'month');
    }
  }
}
