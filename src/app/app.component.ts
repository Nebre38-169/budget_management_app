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
    this.router.navigateRoot('/connexion/login');
  }

  closeMenu(){
    this.menu.close('first');
  }

  onLogout(){
    this.auth.logout(this.auth.getUser().getId())
    .subscribe(value =>{
      console.log(value);
      this.router.navigateRoot('/connexion/login');
      this.closeMenu();
    })
  }
}
