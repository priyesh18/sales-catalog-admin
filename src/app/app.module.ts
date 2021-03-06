import { PastOrdersPage } from './../pages/past-orders/past-orders';
import { ChartsPage } from './../pages/charts/charts';
import { OrderService } from './../service/order.service';
import { firebaseConfig } from './../environment/environment';
import { CategoryService } from './../service/category.service';
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
import { FCM } from '@ionic-native/fcm';


import { MyApp } from './app.component';
import { OrderListPage } from '../pages/order-list/order-list';
import { ProductListPage } from '../pages/product-list/product-list';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../service/auth.service';


@NgModule({
  declarations: [
    MyApp,
    OrderListPage,
    ProductListPage,
    ChartsPage,
    ProductsPage,
    EditProductPage,
    TabsPage,
    PastOrdersPage,
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
    ProductListPage,
    ChartsPage,
    PastOrdersPage,
    ProductsPage,
    EditProductPage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProductService,
    OrderService,
    Camera,
    FCM,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase,
    UserService,
    AuthService,
    CategoryService
  ]
})
export class AppModule {}
