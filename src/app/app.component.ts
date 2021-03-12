import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth : AuthService,
    private router : NavController,
    private menu : MenuController) {}

  ngOnInit(): void {
    if(this.auth.isLogged()){
      //Yes the user is logged
    } else {
      this.auth.autologin().subscribe(value =>{
        if(value instanceof Error){
          console.log(value);
          this.router.navigateRoot('/connexion/login')
        } else {
          this.router.navigateRoot('/home');
        }
      })
      
    }
  }

  closeMenu(){
    this.menu.close('first');
  }
}
