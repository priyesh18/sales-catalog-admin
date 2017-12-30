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
      firebase.initializeApp({
        apiKey: "AIzaSyC9eYTtyWNtxxjYNJmqPWR00q6zeCjZNMQ",
        authDomain: "triveni-b663b.firebaseapp.com",
        databaseURL: "https://triveni-b663b.firebaseio.com",
        projectId: "triveni-b663b",
        storageBucket: "triveni-b663b.appspot.com",
        messagingSenderId: "640003599792"
      });
  }
    auth.user$.subscribe(user => {
      if (!user) return; 
      this.rootPage = TabsPage;
      userService.save(user);
    }) 
     
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
}

