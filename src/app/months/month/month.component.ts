import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Month } from 'src/app/class/month/month';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ExpenseService } from 'src/app/service/expense/expense.service';
import { MonthService } from 'src/app/service/month/month.service';
import { CreateMonthComponent } from '../create-month/create-month.component';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
})
export class MonthComponent implements OnInit {
  @Input() monthOBJ  : Month;

  constructor(private auth : AuthService,
    private modalCtrl : ModalController,
    private month : MonthService,
    private expense : ExpenseService,
    private router : NavController) { }

  ngOnInit() {}

  onDelete(){
    this.month.delete(this.monthOBJ.getId()).subscribe(
      value =>{
        this.expense.deleteByDependance(this.monthOBJ.getId(),'month').subscribe();
        this.month.fetchForDependance(this.auth.getId(),'user');
        this.router.navigateRoot('');
        }
    )
  }

  async onEdit(){
    const modal = await this.modalCtrl.create({
      component : CreateMonthComponent,
      componentProps : {
        editedMonth : this.monthOBJ
      }
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(!data.dismissed){
      this.month.fetchForDependance(this.auth.getId(),'user');
    }
  }
}
