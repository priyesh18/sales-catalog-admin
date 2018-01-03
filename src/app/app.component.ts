import { environment } from './../environment/environment';
import { LoginPage } from './../pages/login/login';
import { UserService } from './../service/user.service';
import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { AuthService } from '../service/auth.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private auth: AuthService,
    private userService: UserService
  ) {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
  }
    auth.user$.subscribe(user => {
      if (!user) return; 
      this.rootPage = TabsPage;
      userService.save(user);
    }) 
     
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
}

