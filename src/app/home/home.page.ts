import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Expense } from '../class/expense/expense';
import { Month } from '../class/month/month';
import { User } from '../class/user/user';
import { CreateMonthComponent } from '../month/create-month/create-month.component';
import { AuthService } from '../service/auth/auth.service';
import { ExpenseService } from '../service/expense/expense.service';
import { MonthService } from '../service/month/month.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {
  public user : number;
  public monthList : Month[];

  private monthSub : Subscription;
  constructor(private auth : AuthService,
    private month : MonthService,
    private modalCtrl : ModalController,
    private router : NavController) {}

  

  ngOnInit(): void {
    this.user = this.auth.getId();
    this.monthSub = this.month.objectListObs.subscribe(
      value => this.monthList = value
    )
    this.month.fetchForDependance(this.user,'user');
  }

  ngOnDestroy(): void {
    this.monthSub.unsubscribe();
  }

  onMonth(e : Expense) : void {
    this.router.navigateRoot(`/month/${e.date.getFullYear()}-${e.date.getMonth()}`)
  }

  async presentModal(){
    const modal = await this.modalCtrl.create({
      component : CreateMonthComponent
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(!data.dismissed){
      this.month.fetchForDependance(this.user,'user');
    }
  }
}
