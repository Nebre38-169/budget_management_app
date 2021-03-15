import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Month } from 'src/app/class/month/month';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MonthService } from 'src/app/service/month/month.service';
import { CreateMonthComponent } from '../create-month/create-month.component';

@Component({
  selector: 'app-display-all-month',
  templateUrl: './display-all-month.component.html',
  styleUrls: ['./display-all-month.component.scss'],
})
export class DisplayAllMonthComponent implements OnInit {
  public monthList : Month[];

  private monthSub : Subscription;
  constructor(
    private auth : AuthService,
    private month : MonthService,
    private modalCtrl : ModalController
  ) { }

  async ngOnInit() {
    this.monthSub = this.month.objectListObs.subscribe(
      value =>{
        console.log(value);
        this.monthList = value;
      }
    )
    this.month.fetchForDependance(await this.auth.getId(),'user');
  }

  async onNewMonth(){
    const modal = await this.modalCtrl.create({
      component : CreateMonthComponent
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(!data.dismissed){
      this.month.fetchForDependance(this.auth.getId(),'user');
    }
  }

}
