import { Component, Input, OnInit } from '@angular/core';
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
  @Input() editedMonth : Month;

  public startDate : string;
  public endDate : string;
  public budget : number;

  constructor(private modalCtrl : ModalController,
    private auth : AuthService,
    private month : MonthService) { }

  ngOnInit() {
    if(this.editedMonth){
      this.startDate = `${this.editedMonth.startDate.getFullYear()}-${this.editedMonth.startDate.getMonth()+1}-${this.editedMonth.startDate.getDate()}`;
      this.endDate = `${this.editedMonth.endDate.getFullYear()}-${this.editedMonth.endDate.getMonth()+1}-${this.editedMonth.endDate.getDate()}`;
      this.budget = this.editedMonth.budget;
    }
  }

  onDismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  onSubmit(){
    if(this.editedMonth){
      this.editedMonth.startDate = new Date(this.startDate);
      this.editedMonth.endDate = new Date(this.endDate);
      this.editedMonth.budget = this.budget;
      this.month.edit(this.editedMonth)
      .subscribe(value =>{
        if(value instanceof Error){
          console.log(value);
        } else {
          this.modalCtrl.dismiss({
            'dismissed':false
          })
        }
      })
    }else {
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
}
