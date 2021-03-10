import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.scss'],
})
export class ExpenseCreateComponent implements OnInit {

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {}

  onDismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
