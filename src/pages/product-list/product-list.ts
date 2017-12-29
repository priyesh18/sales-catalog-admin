import { ProductsPage } from './../products/products';
import { Component } from '@angular/core';
import { EditProductPage } from '../edit-product/edit-product';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  constructor(private navCtrl: NavController,private auth: AuthService) {}

 editProductPage = EditProductPage;
 onClick(page: Object) {
   //console.log(page);
   this.navCtrl.push(ProductsPage,page);
 }
 logout() {
  this.auth.logout();
  
  
}

}
