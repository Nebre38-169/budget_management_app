import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Expense } from '../class/expense/expense';
import { User } from '../class/user/user';
import { AuthService } from '../service/auth/auth.service';
import { ExpenseService } from '../service/expense/expense.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {
  public user : number;
  public monthList : Expense[];
  private expenseSub : Subscription;
  constructor(private auth : AuthService,
    private expense : ExpenseService,
    private router : NavController) {}

  

  ngOnInit(): void {
    this.user = this.auth.getId();
    this.expenseSub = this.expense.monthList.subscribe(
      value => this.monthList = value
    )
    this.expense.fecthMonthOfUser(this.user);
  }

  ngOnDestroy(): void {
    this.expenseSub.unsubscribe();
  }

  onMonth(e : Expense) : void {
    this.router.navigateRoot(`/month/${e.date.getFullYear()}-${e.date.getMonth()}`)
  }
}
