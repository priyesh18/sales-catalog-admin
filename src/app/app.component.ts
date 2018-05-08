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
import { FCM } from '@ionic-native/fcm';


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
    private userService: UserService,
    private fcm: FCM
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
      //Notifications
      if (platform.is('cordova')) {
        fcm.subscribeToTopic('all');

        fcm.getToken().then(token=>{
        // backend.registerToken(token);
            console.log(token);
        })

        fcm.onNotification().subscribe(data=>{
          if(data.wasTapped){
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        })

        fcm.onTokenRefresh().subscribe(token=>{
          //backend.registerToken(token);
          console.log(token);
        });
      }
      //end notifications.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  
}

