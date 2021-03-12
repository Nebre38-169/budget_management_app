import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from '../class/user/user';
import { AuthService } from '../service/auth/auth.service';
import { EditPasswordComponent } from './edit-password/edit-password.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit,OnDestroy {
  public user : User;

  private logSub : Subscription;
  constructor(private auth : AuthService,
    private modalCtrl : ModalController) { }

  ngOnDestroy(): void {
    this.logSub.unsubscribe();
  }

  ngOnInit() {
    this.logSub = this.auth.userAsSubject.subscribe(
      value => this.user = value
    )
    this.auth.updateUser();
  }

  async onEditPassword(){
    const modal = await this.modalCtrl.create({
      component : EditPasswordComponent
    })
    return await modal.present();
  }

}
