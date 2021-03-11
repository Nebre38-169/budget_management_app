import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ExpenseService } from 'src/app/service/expense/expense.service';
import { ExpenseCreateComponent } from '../expense-create/expense-create.component';

@Component({
  selector: 'app-add-expense-button',
  templateUrl: './add-expense-button.component.html',
  styleUrls: ['./add-expense-button.component.scss'],
})
export class AddExpenseButtonComponent implements OnInit {

  @Input() month : number;
  @Input() year : number;
  @Input() user : number;

  constructor(private auth : AuthService,
    private expense : ExpenseService,
    private modalCtrl : ModalController) { }

  ngOnInit() {}

  async presentModal(){
    const modal = await this.modalCtrl.create({
      component : ExpenseCreateComponent
    })
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(!data.dismissed){
      if(this.month && this.year){
        console.log('update one month');
        this.expense.fecthExpenseOfMonth(this.year,this.month,this.user);
      } else {
        console.log('update all month');
        this.expense.fecthMonthOfUser(this.user);
      }
    }
  }

}
