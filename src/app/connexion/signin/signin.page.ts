import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/class/user/user';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  public newEmail : string;
  public newPassword : string;
  public matchingPassword : string;
  public firstName : string;
  public lastName : string;
  public budget : number;

  constructor(private auth : AuthService,
    private router : NavController) { }

  ngOnInit() {
  }

  onSignIn(){
    let newUser = new User(0,new Date(),new Date(),this.newEmail,this.firstName,this.lastName,this.budget);
    if(this.newPassword===this.matchingPassword){
      this.auth.signin(newUser,this.newPassword).subscribe(
        value =>{
          if(value instanceof Error){
            //TODO : manage error message
            console.log(value);
          } else {
            this.auth.login(this.newEmail,this.newPassword,false).subscribe(
              value =>{
                if(value instanceof Error){
                  console.log(value);
                } else {
                  this.router.navigateRoot('/home');
                }
              }
            )
          }
        }
      )
    }
    
  }

}
