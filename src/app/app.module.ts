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


@NgModule({
  declarations: [
    MyApp,
    OrderListPage,
    OrderPage,
    ProductListPage,
    ProductsPage,
    EditProductPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrderListPage,
    OrderPage,
    ProductListPage,
    ProductsPage,
    EditProductPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ProductService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
