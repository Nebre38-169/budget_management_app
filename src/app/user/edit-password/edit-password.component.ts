import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/class/user/user';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss'],
})
export class EditPasswordComponent implements OnInit {
  public oldPass : string;
  public newPass: string;
  public newPassConfir : string;

  private loggedUser : User;
  private logSub : Subscription;
  constructor(private auth : AuthService,
    private modalCtrl : ModalController) { }

  ngOnInit() {
    this.loggedUser = this.auth.getUser();
  }

  onSubmit(){
    if(this.newPass === this.newPassConfir){
      this.auth.editPassword(
        this.loggedUser,
        this.oldPass,
        this.newPass
      ).subscribe(
        value =>{
          if(value instanceof Error){
            console.log(value);
            //TODO : handle error message
          } else {
            this.modalCtrl.dismiss();
          }
        }
      )
    }
  }

  onDismiss(){
    this.modalCtrl.dismiss();
  }

}
