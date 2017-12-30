import { ProductsPage } from './../products/products';
import { Component } from '@angular/core';
import { EditProductPage } from '../edit-product/edit-product';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { AuthService } from '../../service/auth.service';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  categories$;
  constructor(
    private navCtrl: NavController,
    categoryService: CategoryService,
    private auth: AuthService) {
    this.categories$ = categoryService.getAll();
  }

 editProductPage = EditProductPage;
 
 onClick(page: Object) {
   this.navCtrl.push(ProductsPage,page);
 }

 logout() {
  this.auth.logout(); 
}


}
