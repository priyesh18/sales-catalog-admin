import { ProductsPage } from './../products/products';
import { Component } from '@angular/core';
import { EditProductPage } from '../edit-product/edit-product';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  constructor(private navCtrl: NavController) {}

 editProductPage = EditProductPage;
 onClick(page: Object) {
   //console.log(page);
   this.navCtrl.push(ProductsPage,page);
 }

}
