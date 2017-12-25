import { ProductService } from './../../service/product.service';
import { Product } from './../../models/product.model';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

  constructor(private productService: ProductService) {}
  imagerl="";
  onAddProduct(form: NgForm) {
    console.log(form.value);
    this.productService.onAdd(
      form.value.id,
      form.value.company,
      form.value.type,
      form.value.subtype,
      form.value.price,
      form.value.imageUrl
    ).subscribe(
      () => console.log('success'),
      error => {
        console.log(error);
      }
    )
    this.imagerl=form.value.imageUrl;
    
  }
}
