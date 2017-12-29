import { LoginPage } from './../pages/login/login';
import { UserService } from './../service/user.service';
import { Camera } from '@ionic-native/camera';
import { ProductService } from './../service/product.service';
import { EditProductPage } from './../pages/edit-product/edit-product';
import { ProductsPage } from './../pages/products/products';
import { TabsPage } from './../pages/tabs/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http'; 

import { MyApp } from './app.component';
import { OrderListPage } from '../pages/order-list/order-list';
import { OrderPage } from '../pages/order/order';
import { ProductListPage } from '../pages/product-list/product-list';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../service/auth.service';

export const firebaseConfig = {
  apiKey: "AIzaSyC9eYTtyWNtxxjYNJmqPWR00q6zeCjZNMQ",
    authDomain: "triveni-b663b.firebaseapp.com",
    databaseURL: "https://triveni-b663b.firebaseio.com",
    projectId: "triveni-b663b",
    storageBucket: "triveni-b663b.appspot.com",
    messagingSenderId: "640003599792"
};


@NgModule({
  declarations: [
    MyApp,
    OrderListPage,
    OrderPage,
    ProductListPage,
    ProductsPage,
    EditProductPage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrderListPage,
    OrderPage,
    ProductListPage,
    ProductsPage,
    EditProductPage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProductService,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase,
    UserService,
    AuthService
  ]
})
export class AppModule {}
