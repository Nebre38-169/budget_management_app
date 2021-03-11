import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Expense } from '../class/expense/expense';
import { User } from '../class/user/user';
import { ExpenseCreateComponent } from '../expense/expense-create/expense-create.component';
import { AuthService } from '../service/auth/auth.service';
import { ExpenseService } from '../service/expense/expense.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.page.html',
  styleUrls: ['./month.page.scss'],
})
export class MonthPage implements OnInit,OnDestroy {
  public currentMonth : Date;
  public loggedUser : User;
  public expenseList : Expense[];
  public total : number;
  public restant : number;
  public restantPourcent : number;


  private logSub : Subscription
  constructor(
    private auth : AuthService,
    private expense : ExpenseService,
    private route : ActivatedRoute,
    private modalCtrl : ModalController
  ) { }
  
  private fecthExpense(){
    this.expense.getExpenseOfMonth(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth()+1,
      this.loggedUser.getId())
    .subscribe(
      value =>{
        this.expenseList = value;
        this.total = this.expense.getTotal(this.expenseList);
        this.restant = this.loggedUser.budget-this.total;
        this.restantPourcent = Math.round(100*this.restant/this.loggedUser.budget);
      }
    )
  }

  ngOnInit() {
    let date :string = this.route.snapshot.params['date'];
    this.currentMonth = new Date(date);
    this.logSub = this.auth.userAsSubject.subscribe(
      value =>{
        this.loggedUser = value;
        this.fecthExpense();
      }
    )
    this.auth.getUser();
  }

  ngOnDestroy(): void {
    this.logSub.unsubscribe();
  }

  async presentModal(){
    const modal = await this.modalCtrl.create({
      component : ExpenseCreateComponent
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(!data.dismissed){
      this.fecthExpense();
    }
  }

}
