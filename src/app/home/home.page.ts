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
  public loggedUser : User;
  public monthList : Expense[];

  private logSub : Subscription;
  constructor(private auth : AuthService,
    private expense : ExpenseService,
    private router : NavController) {}

  

  ngOnInit(): void {
    this.logSub = this.auth.userAsSubject.subscribe(
      value =>{
        if(value!=undefined){
          this.loggedUser = value;
          this.expense.getMonthOfUser(this.loggedUser.getId())
          .subscribe(value => this.monthList = value);
        }
      }
    )
    this.auth.getUser();
  }

  ngOnDestroy(): void {
    this.logSub.unsubscribe();
  }

  onMonth(e : Expense) : void {
    this.router.navigateRoot(`/month/${e.date.getFullYear()}-${e.date.getMonth()}`)
  }

  

}
