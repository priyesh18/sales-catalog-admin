import { Component } from '@angular/core';
import { EditProductPage } from '../edit-product/edit-product';

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

 editProductPage = EditProductPage;

}
