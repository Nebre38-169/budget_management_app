import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Month } from 'src/app/class/month/month';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MonthService } from 'src/app/service/month/month.service';

@Component({
  selector: 'app-create-month',
  templateUrl: './create-month.component.html',
  styleUrls: ['./create-month.component.scss'],
})
export class CreateMonthComponent implements OnInit {
  public startDate : Date;
  public endDate : Date;
  public budget : number;

  constructor(private modalCtrl : ModalController,
    private auth : AuthService,
    private month : MonthService) { }

  ngOnInit() {}

  onDismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  onSubmit(){
    let newMonth = new Month(
      undefined,
      undefined,
      undefined,
      this.auth.getId(),
      new Date(this.startDate),
      new Date(this.endDate),
      0,
      this.budget
    )
    this.month.createNew(newMonth)
    .subscribe(
      value =>{
        if(value instanceof Error){
          console.log(value);
        } else {
          this.modalCtrl.dismiss({
            'dismissed':false
          })
        }
      }
    )
  }

}
